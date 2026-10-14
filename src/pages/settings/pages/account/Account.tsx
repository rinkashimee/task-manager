import { useState, useRef, type ChangeEvent } from 'react';
import { useToast } from '@/components/ui/Toast/ToastProvider';
import { useTranslation } from 'react-i18next';
import ProfilePictureUpload from './components/ProfilePictureUpload';
import AccountForm from './components/AccountForm';
import type { AccountFormTypes } from './types/Account.types';
import SettingsCard from '@/components/ui/Cards/SettingsCard';
import Appearance from '../appearance/Appearance';

export default function Account() {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [avatar, setAvatar] = useState<string | null>(null);

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const maxFileSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      showToast({
        title: t('common.toast-title.fail'),
        description: 'Only JPG, PNG, and GIF images are allowed.',
        variant: 'error',
      });

      event.target.value = '';
      return;
    }

    if (file.size > maxFileSize) {
      showToast({
        title: t('common.toast-title.fail'),
        description: 'Image size must not exceed 2 MB.',
        variant: 'error',
      });

      event.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result !== 'string') return;

      setAvatar(reader.result);
    };

    reader.onerror = () => {
      showToast({
        title: t('common.toast-title.fail'),
        description: 'Unable to read the selected image.',
        variant: 'error',
      });
    };

    reader.readAsDataURL(file);

    event.target.value = '';
  };

  const handleSubmit = (data: AccountFormTypes) => {
    // TODO: Integrate user profile update API
  };

  return (
    <div className="flex min-h-full flex-col gap-3">
      <SettingsCard
        title={t('settings.account-setting.account')}
        caption={t('settings.account-setting.desc')}
      >
        <ProfilePictureUpload avatar={avatar} fileInputRef={fileInputRef} setAvatar={setAvatar} />

        <div className="border-border my-5 border-t" />

        <AccountForm
          fileInputRef={fileInputRef}
          handleSubmit={handleSubmit}
          handleUpload={handleUpload}
        />
      </SettingsCard>

      <Appearance variant="compact" />
    </div>
  );
}
