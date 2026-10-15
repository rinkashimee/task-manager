import { useToast } from '@/components/ui/Toast/ToastProvider';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import type { RegisterRequest } from '../register/types/Register.types';
import { authApi } from '../services/authApi';
import { useSpinner } from '@/components/ui/Spinner/SpinnerContext';
import { getApiErrorMessage } from '@/api/apiError';

export type AuthLoadingState = {
  register: boolean;
};

export function useAuth() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { showLoading, hideLoading } = useSpinner();

  const navigate = useNavigate();

  const [loading, setLoading] = useState<AuthLoadingState>({
    register: false,
  });

  const register = async (values: RegisterRequest): Promise<void> => {
    try {
      setLoading((prev) => ({ ...prev, register: true }));
      showLoading();

      const response = await authApi.register(values);

      showToast({
        title: t('common.toast-title.success'),
        description: response.message,
        variant: 'success',
      });

      navigate('/login');
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
  };

  return {
    isRegister: loading.register,
    register,
  };
}
