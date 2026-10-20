import SettingsCard from '@/components/ui/Cards/SettingsCard';
import Typography from '@/components/ui/Typography/Typography';
import { useTranslation } from 'react-i18next';
import { informationItems } from '../constants/About.constants';

export default function AboutInformation() {
  const { t } = useTranslation();

  return (
    <SettingsCard
      title={t('settings.about.information.app-info')}
      caption={t('settings.about.information.app-info-caption')}
    >
      <div className="flex flex-col gap-4">
        {informationItems.map((item) => (
          <div key={item.label} className="flex items-center justify-between gap-3">
            <Typography variant="caption" className="text-text-muted">
              {t(item.label)}
            </Typography>

            <Typography variant="caption" className="text-text font-medium">
              {t(item.value, {
                value: item.version,
              })}
            </Typography>
          </div>
        ))}
      </div>
    </SettingsCard>
  );
}
