import { useToast } from '@/components/ui/Toast/ToastProvider';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { RegisterRequest } from '../register/types/Register.types';
import { authApi } from '../services/authApi';
import { useSpinner } from '@/components/ui/Spinner/SpinnerContext';
import { getApiErrorMessage } from '@/api/apiError';
import type { VerificationStatus } from '../verify-email/types/VerifyEmail.types';
import axios from 'axios';
import type { LoginRequest, LoginResult } from '../login/types/Login.types';

export type AuthLoadingState = {
  register: boolean;
  resend: boolean;
  verify: boolean;
  login: boolean;
};

export function useAuth() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { showLoading, hideLoading } = useSpinner();

  const navigate = useNavigate();

  const [loading, setLoading] = useState<AuthLoadingState>({
    register: false,
    resend: false,
    verify: false,
    login: false,
  });

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
    [showToast, t]
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
    [showToast, t]
  );

  const verifyEmail = useCallback(
    async (token: string): Promise<VerificationStatus> => {
      try {
        setLoading((prev) => ({ ...prev, verify: true }));
        showLoading();

        const result = await authApi.verifyEmail({ token });

        if (result.success) {
          localStorage.removeItem('pendingVerificationEmail');
        }

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
        hideLoading();
      }
    },
    [showToast, t]
  );

  const login = useCallback(
    async (values: LoginRequest): Promise<LoginResult> => {
      try {
        setLoading((prev) => ({ ...prev, login: true }));
        showLoading();

        const response = await authApi.login(values);

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
    [showToast, t]
  );

  return {
    isRegister: loading.register,
    isResend: loading.resend,
    isVerify: loading.verify,
    isLogin: loading.login,
    register,
    resendVerification,
    verifyEmail,
    login,
  };
}
