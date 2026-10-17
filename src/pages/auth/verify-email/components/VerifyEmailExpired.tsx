import TaskIcon from '@/components/icons/TaskIcon';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import Typography from '@/components/ui/Typography/Typography';
import { cn } from '@/lib/utils/utils';
import { useTranslation } from 'react-i18next';

interface VerifyEmailExpiredProps {
  email: string;
  isResending: boolean;
  isResent: boolean;
  cooldown: number;
  handleResend: () => void;
  onEmailChange: (email: string) => void;
}

export default function VerifyEmailExpired(props: VerifyEmailExpiredProps) {
  const { email, isResending, isResent, cooldown, handleResend, onEmailChange } = props;

  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-5">
      <div
        className={cn(
          'flex size-12 items-center justify-center rounded-xl',
          isResent ? 'bg-success/10' : 'bg-warning/10'
        )}
      >
        <TaskIcon
          icon={isResent ? 'CheckCircleIcon' : 'WarningIcon'}
          size={24}
          className={isResent ? 'text-success' : 'text-warning'}
        />
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="h2" className="font-heading text-text !font-bold">
          {isResent
            ? t('auth.verify-email.expired.resend-success')
            : t('auth.verify-email.expired.expired-link')}
        </Typography>

        <Typography variant="body-sm" className="text-text-muted">
          {isResent
            ? t('auth.verify-email.expired.resend-success-desc')
            : t('auth.verify-email.expired.desc')}
        </Typography>
      </div>

      {!isResent && (
        <div className="flex flex-col gap-2">
          <Typography variant="body-sm" className="text-text font-medium">
            {t('auth.forgot-pass.form.email')}
          </Typography>

          <Input
            type="email"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder={t('auth.forgot-pass.placeholder.email')}
          />
        </div>
      )}

      <Button
        type="button"
        disabled={!email.trim() || isResending || cooldown > 0}
        onClick={handleResend}
        variant="primary"
        className="mt-2 h-10 w-full gap-2 px-4"
      >
        <Typography as="p" variant="caption" className="truncate font-semibold">
          {isResending
            ? t('common.sending')
            : cooldown > 0
              ? t('common.resend-cooldown', { cooldown: cooldown })
              : t('common.resend-email')}
        </Typography>
      </Button>
    </div>
  );
}
