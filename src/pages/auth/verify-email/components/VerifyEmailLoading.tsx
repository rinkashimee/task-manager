import TaskIcon from '@/components/icons/TaskIcon';
import Typography from '@/components/ui/Typography/Typography';
import { useTranslation } from 'react-i18next';

export default function VerifyEmailLoading() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3">
      <div className="bg-primary/10 flex size-12 items-center justify-center rounded-xl">
        <TaskIcon icon="EnvelopeIcon" size={24} className="text-primary" />
      </div>

      <Typography variant="h2" className="font-heading text-text !font-bold">
        {t('auth.verify-email.verifying.loading')}
      </Typography>

      <Typography variant="body-sm" className="text-text-muted">
        {t('auth.verify-email.verifying.desc')}
      </Typography>
    </div>
  );
}
