import Header from '@/components/layouts/header/Header';
import SettingsLayout from '@/components/layouts/SettingsLayout';
import { useTranslation } from 'react-i18next';

export default function Settings() {
  const { t } = useTranslation();

  return (
    <div className="flex h-full min-h-0 flex-col">
      <Header title={t('settings.title')} caption={t('settings.caption')} />

      <SettingsLayout />
    </div>
  );
}
