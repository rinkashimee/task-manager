import SettingsCard from '@/components/ui/Cards/SettingsCard';
import { useTranslation } from 'react-i18next';
import { featureItems } from '../constants/About.constants';
import AboutFeatureItem from './AboutFeatureItem';

export default function AboutFeatures() {
  const { t } = useTranslation();

  return (
    <SettingsCard
      title={t('settings.about.features.title')}
      caption={t('settings.about.features.desc')}
      className="flex w-full flex-1 flex-col"
    >
      <div className="mt-2 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {featureItems.map((item, index) => (
          <AboutFeatureItem
            key={index}
            title={item.title}
            icon={item.icon}
            description={item.description}
          />
        ))}
      </div>
    </SettingsCard>
  );
}
