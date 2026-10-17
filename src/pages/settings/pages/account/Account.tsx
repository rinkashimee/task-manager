import { useRef, type ChangeEvent } from 'react';
import { useToast } from '@/components/ui/Toast/ToastProvider';
import { useTranslation } from 'react-i18next';
import ProfilePictureUpload from './components/ProfilePictureUpload';
import AccountForm from './components/AccountForm';
import type { AccountFormTypes } from './types/Account.types';
import SettingsCard from '@/components/ui/Cards/SettingsCard';
import Appearance from '../appearance/Appearance';
import { useAuthSession } from '@/pages/auth/hooks/useAuthSession';
import { useUser } from './hooks/useUser';
import { compressImage } from '@/lib/utils/utils';

export default function Account() {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const { user } = useAuthSession();

  const {
    isUpdating,
    isDeleting,
    isUploading,
    updateProfile,
    uploadProfileImage,
    deleteProfileImage,
  } = useUser();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    event.target.value = '';

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxFileSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      showToast({
        title: t('common.toast-title.fail'),
        description: t('common.toast-title.desc.supported-image'),
        variant: 'error',
      });

      return;
    }

    if (file.size > maxFileSize) {
      showToast({
        title: t('common.toast-title.fail'),
        description: t('common.toast-title.desc.max-size'),
        variant: 'error',
      });

      return;
    }

    try {
      const optimizedFile = await compressImage(file);

      await uploadProfileImage(optimizedFile);
    } catch {
      showToast({
        title: t('common.toast-title.fail'),
        description: t('common.toast-title.desc.unable'),
        variant: 'error',
      });
    }
  };

  const handleRemove = async () => {
    if (!user?.profileImage) return;

    await deleteProfileImage();
  };

  const handleSubmit = async (data: AccountFormTypes) => {
    const name = data.name.trim();

    if (!name) {
      showToast({
        title: t('common.toast-title.fail'),
        description: t('common.toast-title.desc.name'),
        variant: 'error',
      });
      return;
    }

    if (name === user?.name) {
      showToast({
        title: t('common.toast-title.warning'),
        description: t('common.toast-title.desc.no-changes'),
        variant: 'warning',
      });
      return;
    }

    await updateProfile({ name });
  };

  return (
    <div className="flex min-h-full flex-col gap-3">
      <SettingsCard
        title={t('settings.account-setting.account')}
        caption={t('settings.account-setting.desc')}
      >
        <ProfilePictureUpload
          avatar={user?.profileImage ?? null}
          name={user?.name}
          fileInputRef={fileInputRef}
          onRemove={handleRemove}
          isUploading={isUploading}
          isDeleting={isDeleting}
        />

        <div className="border-border my-5 border-t" />

        <AccountForm
          isUpdating={isUpdating}
          fileInputRef={fileInputRef}
          handleSubmit={handleSubmit}
          handleUpload={handleUpload}
        />
      </SettingsCard>

      <Appearance variant="compact" />
    </div>
  );
}
