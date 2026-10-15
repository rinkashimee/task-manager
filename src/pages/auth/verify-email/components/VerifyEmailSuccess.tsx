import TaskIcon from '@/components/icons/TaskIcon';
import Button from '@/components/ui/Button/Button';
import Typography from '@/components/ui/Typography/Typography';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function VerifyEmailSuccess() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-success/10 flex size-12 items-center justify-center rounded-xl">
        <TaskIcon icon="CheckCircleIcon" size={24} className="text-success" />
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="h2" className="font-heading text-text !font-bold">
          {t('auth.verify-email.success.email')}
        </Typography>

        <Typography variant="body-sm" className="text-text-muted">
          {t('auth.verify-email.success.desc')}
        </Typography>
      </div>

      <Link to="/login" className="block">
        <Button type="button" variant="primary" className="mt-2 h-10 w-full gap-2 px-4">
          <Typography as="p" variant="caption" className="truncate font-semibold">
            {t('common.continue-sign-in')}
          </Typography>
        </Button>
      </Link>
    </div>
  );
}
