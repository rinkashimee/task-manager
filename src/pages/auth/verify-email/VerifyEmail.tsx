import { useEffect, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import TaskIcon from '@/components/icons/TaskIcon';
import Typography from '@/components/ui/Typography/Typography';
import type { VerificationStatus, VerifyEmailLocationState } from './types/VerifyEmail.types';
import VerifyEmailPending from './components/VerifyEmailPending';
import taskManagerLogo from '@/assets/task-manager-logo.svg';
import { useTranslation } from 'react-i18next';
import VerifyEmailLoading from './components/VerifyEmailLoading';
import VerifyEmailSuccess from './components/VerifyEmailSuccess';
import VerifyEmailExpired from './components/VerifyEmailExpired';
import { cn } from '@/lib/utils/utils';
import { useAuth } from '../hooks/useAuth';
import { useToast } from '@/components/ui/Toast/ToastProvider';

export default function VerifyEmail() {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const location = useLocation();
  const [searchParams] = useSearchParams();

  const token = searchParams.get('token');

  const locationState = location.state as VerifyEmailLocationState | null;

  const mode = locationState?.mode ?? 'registration';

  const [email, setEmail] = useState(
    () => locationState?.email ?? localStorage.getItem('pendingVerificationEmail') ?? ''
  );

  const { resendVerification, verifyEmail, isResend, isVerify } = useAuth();

  const [isResent, setIsResent] = useState<boolean>(false);
  const [status, setStatus] = useState<VerificationStatus>(token ? 'verifying' : 'pending');

  const [cooldown, setCooldown] = useState(60);

  useEffect(() => {
    if (!token) {
      setStatus('pending');
      return;
    }

    let cancelled = false;

    const handleVerification = async () => {
      setStatus('verifying');

      const result = await verifyEmail(token);

      if (!cancelled) {
        setStatus(result);
      }
    };

    void handleVerification();

    return () => {
      cancelled = true;
    };
  }, [token, verifyEmail]);

  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setTimeout(() => {
      setCooldown((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [cooldown]);

  const handleResend = async () => {
    const normalizedEmail = email.trim().toLowerCase();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      showToast({
        title: t('common.toast-title.fail'),
        description: t('auth.verify-email.invalid-email'),
        variant: 'error',
      });

      return;
    }

    if (isResend || cooldown > 0) return;

    const success = await resendVerification(normalizedEmail);

    if (success) {
      setCooldown(60);
      setIsResent(true);

      localStorage.setItem('pendingVerificationEmail', normalizedEmail);
    }
  };

  const handleRetry = async () => {
    if (!token || status === 'verifying') return;

    setStatus('verifying');

    const result = await verifyEmail(token);

    setStatus(result);
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col items-center gap-2 lg:hidden">
        <img src={taskManagerLogo} alt="Task Manager Logo" className="size-12" />

        <Typography variant="h3" className="font-heading text-text !font-bold">
          {t('auth.brand.title')}
        </Typography>
      </div>

      {(status === 'pending' || status === 'error') && (
        <VerifyEmailPending
          status={status}
          mode={mode}
          email={email}
          isResent={isResent}
          isResending={isResend}
          isVerify={isVerify}
          cooldown={cooldown}
          handleResend={handleResend}
          handleRetry={handleRetry}
        />
      )}

      {status === 'verifying' && <VerifyEmailLoading />}

      {status === 'success' && <VerifyEmailSuccess />}

      {status === 'expired' && (
        <VerifyEmailExpired
          email={email}
          isResent={isResent}
          isResending={isResend}
          cooldown={cooldown}
          onEmailChange={setEmail}
          handleResend={handleResend}
        />
      )}

      {status !== 'success' && (
        <Link
          to="/login"
          className={cn(
            'flex items-center justify-center gap-2 font-sans text-xs font-medium transition-colors',
            'text-text-muted hover:text-primary'
          )}
        >
          <TaskIcon icon="ArrowLeftIcon" size={16} />

          {t('common.back-sign-in')}
        </Link>
      )}
    </div>
  );
}
