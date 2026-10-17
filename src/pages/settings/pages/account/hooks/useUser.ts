import { useCallback, useState } from 'react';
import type { UpdateProfileRequest } from '../types/Account.types';
import { userApi } from '../service/userApi';
import { useSpinner } from '@/components/ui/Spinner/SpinnerContext';
import { useToast } from '@/components/ui/Toast/ToastProvider';
import { useTranslation } from 'react-i18next';
import { getApiErrorMessage } from '@/api/apiError';
import { useAuthSession } from '@/pages/auth/hooks/useAuthSession';

type UserLoadingState = {
  updating: boolean;
  uploading: boolean;
  deleting: boolean;
};

export function useUser() {
  const { t } = useTranslation();
  const { showToast } = useToast();
  const { showLoading, hideLoading } = useSpinner();
  const { user, setAuthenticated } = useAuthSession();

  const [loading, setLoading] = useState<UserLoadingState>({
    updating: false,
    uploading: false,
    deleting: false,
  });

  const updateProfile = useCallback(
    async (data: UpdateProfileRequest): Promise<boolean> => {
      setLoading((prev) => ({ ...prev, updating: true }));
      showLoading();

      try {
        const response = await userApi.updateProfile(data);

        setAuthenticated(response.data);

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
        setLoading((prev) => ({ ...prev, updating: false }));
        hideLoading();
      }
    },
    [showLoading, hideLoading, setAuthenticated, showToast, t]
  );

  const uploadProfileImage = useCallback(
    async (file: File): Promise<boolean> => {
      setLoading((prev) => ({ ...prev, uploading: true }));
      showLoading();

      try {
        const response = await userApi.uploadProfileImage(file);

        if (user) {
          setAuthenticated({
            ...user,
            profileImage: response.data.profileImage,
          });
        }

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
        setLoading((prev) => ({ ...prev, uploading: false }));
        hideLoading();
      }
    },
    [user, showLoading, hideLoading, showToast, setAuthenticated, t]
  );

  const deleteProfileImage = useCallback(async (): Promise<boolean> => {
    setLoading((prev) => ({ ...prev, deleting: true }));
    showLoading();

    try {
      const response = await userApi.deleteProfileImage();

      if (user) {
        setAuthenticated({
          ...user,
          profileImage: null,
        });
      }

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
      setLoading((prev) => ({ ...prev, deleting: false }));
      hideLoading();
    }
  }, [user, setAuthenticated, showLoading, hideLoading, showToast, t]);

  return {
    isUpdating: loading.updating,
    isUploading: loading.uploading,
    isDeleting: loading.deleting,
    updateProfile,
    uploadProfileImage,
    deleteProfileImage,
  };
}
