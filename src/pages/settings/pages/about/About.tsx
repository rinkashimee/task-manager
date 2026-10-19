import Typography from '@/components/ui/Typography/Typography';
import { useTranslation } from 'react-i18next';
import AboutFeatures from './components/AboutFeatures';
import AboutInformation from './components/AboutInformation';
import AboutOverview from './components/AboutOverview';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-full flex-col gap-3">
      <AboutOverview />

      <AboutFeatures />

      <AboutInformation />

      <Typography variant="caption" className="text-text-muted py-1 text-center">
        {t('settings.about.caption')}
      </Typography>
    </div>
  );
}
