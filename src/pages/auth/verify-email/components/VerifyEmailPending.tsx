import TaskIcon from '@/components/icons/TaskIcon';
import Button from '@/components/ui/Button/Button';
import Typography from '@/components/ui/Typography/Typography';
import { useTranslation } from 'react-i18next';
import type { VerificationStatus } from '../types/VerifyEmail.types';
import { cn } from '@/lib/utils/utils';

interface VerifyEmailPendingProps {
  status: VerificationStatus;
  isResending: boolean;
  isVerify: boolean;
  email: string | null;
  cooldown: number;
  handleResend: () => void;
  handleRetry: () => void;
}

export default function VerifyEmailPending(props: VerifyEmailPendingProps) {
  const { email, status, isResending, isVerify, cooldown, handleResend, handleRetry } = props;

  const { t } = useTranslation();

  const isError = status === 'error';

  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="bg-primary/10 flex size-12 items-center justify-center rounded-xl">
          <TaskIcon icon="EnvelopeIcon" size={24} className="text-primary" />
        </div>

        <div className="flex flex-col gap-2">
          <Typography variant="h2" className="font-heading text-text !font-bold">
            {isError ? t('auth.verify-email.error.title') : t('auth.verify-email.pending.verify')}
          </Typography>

          <Typography variant="body-sm" className="text-text-muted">
            {isError ? t('auth.verify-email.error.desc') : t('auth.verify-email.pending.desc')}
          </Typography>

          {email && (
            <Typography variant="body-sm" className="text-text font-medium">
              {email}
            </Typography>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <Button
          hidden={!isError}
          type="button"
          disabled={isVerify}
          onClick={handleRetry}
          variant="primary"
          className="mt-2 h-10 w-full gap-2 px-4"
        >
          <Typography as="p" variant="caption" className="truncate font-semibold">
            {t('common.try-again')}
          </Typography>
        </Button>

        <Button
          type="button"
          disabled={!email || isResending || cooldown > 0}
          onClick={handleResend}
          variant={isError ? 'secondary' : 'primary'}
          className={cn(
            'mt-2 h-10 w-full gap-2 px-4',
            isError &&
              'border-primary bg-card text-primary hover:bg-primary hover:text-text-inverse border'
          )}
        >
          <Typography as="p" variant="caption" className="truncate font-semibold">
            {isResending
              ? t('common.sending')
              : cooldown > 0
                ? t('common.resend-cooldown', { cooldown: cooldown })
                : t('common.resend-email')}
          </Typography>
        </Button>

        {!isError && (
          <Typography variant="caption" className="text-text-muted text-center">
            {t('auth.verify-email.pending.no-email-receive')}
          </Typography>
        )}
      </div>
    </>
  );
}
