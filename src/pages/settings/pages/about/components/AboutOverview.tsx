import SettingsCard from '@/components/ui/Cards/SettingsCard';
import Typography from '@/components/ui/Typography/Typography';
import { useTranslation } from 'react-i18next';
import taskManagerLogo from '@/assets/task-manager-logo.svg';
import { version } from '../../../../../../package.json';

export default function AboutOverview() {
  const { t } = useTranslation();

  return (
    <SettingsCard
      title={t('settings.about.overview.about-app')}
      caption={t('settings.about.overview.about-desc')}
    >
      <div className="mb-2 flex items-center gap-3">
        <div className="flex size-13 shrink-0 items-center justify-center">
          <img
            src={taskManagerLogo}
            alt="Task Manager Logo"
            className="h-full w-full object-contain"
          />
        </div>

        <div className="flex flex-col gap-1">
          <Typography variant="body-sm" className="text-text font-semibold">
            {t('settings.about.overview.app-name')}
          </Typography>

          <Typography variant="caption" className="text-text-muted">
            {t('settings.about.overview.version', { value: version })}
          </Typography>
        </div>
      </div>

      <Typography variant="caption" className="text-text-muted">
        {t('settings.about.overview.app-desc')}
      </Typography>
    </SettingsCard>
  );
}
