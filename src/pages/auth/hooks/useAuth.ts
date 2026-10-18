import { useToast } from '@/components/ui/Toast/ToastProvider';
import { useCallback, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { RegisterRequest } from '../register/types/Register.types';
import { authApi } from '../services/authApi';
import { useSpinner } from '@/components/ui/Spinner/SpinnerContext';
import { getApiErrorMessage } from '@/api/apiError';
import type { VerificationStatus } from '../verify-email/types/VerifyEmail.types';
import axios from 'axios';
import type { LoginRequest, LoginResult } from '../login/types/Login.types';
import { tokenManager } from '../services/tokenManager';
import { verifyEmailRequest } from '../services/verifyEmailRequest';
import { useAuthSession } from './useAuthSession';
import { waitForPendingRefresh } from '../services/refreshToken';
import type { ResetPasswordRequest } from '../reset-password/types/ResetPassword.types';

export type AuthLoadingState = {
  register: boolean;
  resend: boolean;
  verify: boolean;
  login: boolean;
  logout: boolean;
  requestReset: boolean;
  resetPassword: boolean;
};

export function useAuth() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { showLoading, hideLoading } = useSpinner();
  const { setUnauthenticated } = useAuthSession();

  const navigate = useNavigate();

  const [loading, setLoading] = useState<AuthLoadingState>({
    register: false,
    resend: false,
    verify: false,
    login: false,
    logout: false,
    requestReset: false,
    resetPassword: false,
  });

  const logoutInProgress = useRef(false);

  const register = useCallback(
    async (values: RegisterRequest): Promise<void> => {
      try {
        setLoading((prev) => ({ ...prev, register: true }));
        showLoading();

        const response = await authApi.register(values);

        showToast({
          title: t('common.toast-title.success'),
          description: response.message,
          variant: 'success',
        });

        localStorage.setItem('pendingVerificationEmail', response.data.email);

        navigate('/verify-email', {
          state: {
            email: response.data.email,
            mode: 'registration',
          },
        });
      } catch (error) {
        const message = getApiErrorMessage(error, t);

        showToast({
          title: t('common.toast-title.fail'),
          description: message,
          variant: 'error',
        });
      } finally {
        setLoading((prev) => ({ ...prev, register: false }));
        hideLoading();
      }
    },
    [showLoading, hideLoading, showToast, t]
  );

  const resendVerification = useCallback(
    async (email: string): Promise<boolean> => {
      try {
        setLoading((prev) => ({ ...prev, resend: true }));
        showLoading();

        const response = await authApi.resendVerification({ email });

        showToast({
          title: t('common.toast-title.success'),
          description: response.message,
          variant: 'success',
        });

        return true;
      } catch (error) {
        showToast({
          title: t('common.toast-title.fail'),
          description: getApiErrorMessage(error, t),
          variant: 'error',
        });

        return false;
      } finally {
        setLoading((prev) => ({ ...prev, resend: false }));
        hideLoading();
      }
    },
    [showLoading, hideLoading, showToast, t]
  );

  const verifyEmail = useCallback(
    async (token: string, retry = false): Promise<VerificationStatus> => {
      try {
        setLoading((prev) => ({ ...prev, verify: true }));

        await verifyEmailRequest(token, retry);

        localStorage.removeItem('pendingVerificationEmail');

        return 'success';
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const status = error.response?.status;

          if (status === 400 || status === 410) {
            return 'expired';
          }
        }

        return 'error';
      } finally {
        setLoading((prev) => ({ ...prev, verify: false }));
      }
    },
    []
  );

  const login = useCallback(
    async (values: LoginRequest): Promise<LoginResult> => {
      try {
        setLoading((prev) => ({ ...prev, login: true }));
        showLoading();

        const response = await authApi.login(values);

        tokenManager.setToken(response.data.accessToken);

        showToast({
          title: t('common.toast-title.success'),
          description: response.message,
          variant: 'success',
        });

        return {
          status: 'success',
          data: response.data,
        };
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 403) {
          return { status: 'unverified' };
        }

        showToast({
          title: t('common.toast-title.fail'),
          description: getApiErrorMessage(error, t),
          variant: 'error',
        });

        return { status: 'error' };
      } finally {
        setLoading((prev) => ({ ...prev, login: false }));
        hideLoading();
      }
    },
    [showLoading, hideLoading, showToast, t]
  );

  const logout = useCallback(async (): Promise<void> => {
    if (logoutInProgress.current) return;

    logoutInProgress.current = true;

    setLoading((prev) => ({ ...prev, logout: true }));
    showLoading();

    tokenManager.clearToken();
    try {
      await waitForPendingRefresh();

      const response = await authApi.logout();

      showToast({
        title: t('common.toast-title.success'),
        description: response.message,
        variant: 'success',
      });
    } catch (error) {
      showToast({
        title: t('common.toast-title.fail'),
        description: getApiErrorMessage(error, t),
        variant: 'error',
      });
    } finally {
      tokenManager.finishLogout();
      setUnauthenticated();

      setLoading((prev) => ({ ...prev, logout: true }));
      hideLoading();

      logoutInProgress.current = false;
    }
  }, [showLoading, hideLoading, showToast, setUnauthenticated, t]);

  const requestPasswordReset = useCallback(
    async (email: string): Promise<boolean> => {
      setLoading((prev) => ({ ...prev, requestReset: true }));
      showLoading();

      try {
        await authApi.forgotPassword({ email });

        return true;
      } catch (error) {
        showToast({
          title: t('common.toast-title.fail'),
          description: getApiErrorMessage(error, t),
          variant: 'error',
        });

        return false;
      } finally {
        setLoading((prev) => ({ ...prev, requestReset: false }));
        hideLoading();
      }
    },
    [showLoading, hideLoading, showToast, t]
  );

  const resetPassword = useCallback(
    async (values: ResetPasswordRequest): Promise<boolean> => {
      setLoading((prev) => ({ ...prev, resetPassword: true }));
      showLoading();

      try {
        await authApi.resetPassword(values);

        return true;
      } catch (error) {
        showToast({
          title: t('common.toast-title.fail'),
          description: getApiErrorMessage(error, t),
          variant: 'error',
        });

        return false;
      } finally {
        setLoading((prev) => ({ ...prev, resetPassword: false }));
        hideLoading();
      }
    },
    [showLoading, hideLoading, showToast, t]
  );

  return {
    isRegister: loading.register,
    isResend: loading.resend,
    isVerify: loading.verify,
    isLogin: loading.login,
    isLogout: loading.logout,
    isRequestReset: loading.requestReset,
    isResetPassword: loading.resetPassword,
    register,
    resendVerification,
    verifyEmail,
    login,
    logout,
    requestPasswordReset,
    resetPassword,
  };
}
