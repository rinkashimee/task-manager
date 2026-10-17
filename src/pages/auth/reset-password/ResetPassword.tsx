import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import taskManagerLogo from '@/assets/task-manager-logo.svg';
import TaskIcon from '@/components/icons/TaskIcon';
import Button from '@/components/ui/Button/Button';
import Typography from '@/components/ui/Typography/Typography';
import type { ResetPasswordFormTypes } from './types/ResetPassword.types';
import { cn } from '@/lib/utils/utils';
import ResetPasswordForm from './components/ResetPasswordForm';

export default function ResetPassword() {
  const { t } = useTranslation();

  const [searchParams] = useSearchParams();

  const [isSuccess, setIsSuccess] = useState(false);

  const token = searchParams.get('token');

  const handleSubmit = async (values: ResetPasswordFormTypes) => {
    if (values.password !== values.confirmPassword) {
      // TODO: Show inline confirm-password validation error
      return;
    }

    if (!token) {
      // TODO: Show invalid or expired reset link message
      return;
    }

    // TODO: Call Spring Boot reset password API with:
    // token and values.password
    //
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      {isSuccess ? (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col items-center gap-2 lg:hidden">
            <img src={taskManagerLogo} alt="Task Manager Logo" className="size-12" />

            <Typography variant="h3" className="font-heading text-text !font-bold">
              {t('auth.brand.title')}
            </Typography>
          </div>

          <div className="bg-success/10 flex size-12 items-center justify-center rounded-xl">
            <TaskIcon icon="CheckCircleIcon" size={24} className="text-success" />
          </div>

          <div className="flex flex-col gap-2">
            <Typography variant="h2" className="font-heading text-text !font-bold">
              {t('auth.reset-password.pass-reset')}
            </Typography>

            <Typography variant="body-sm" className="text-text-muted">
              {t('auth.reset-password.desc')}
            </Typography>
          </div>

          <Link to="/login">
            <Button type="button" variant="primary" className="mt-2 h-10 w-full gap-2 px-4">
              <Typography as="p" variant="caption" className="truncate font-semibold">
                {t('common.back-sign-in')}
              </Typography>
            </Button>
          </Link>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col items-center gap-2 lg:hidden">
              <img src={taskManagerLogo} alt="Task Manager Logo" className="size-12" />

              <Typography variant="h3" className="font-heading text-text !font-bold">
                {t('auth.brand.title')}
              </Typography>
            </div>

            <div className="bg-primary/10 flex size-12 items-center justify-center rounded-xl">
              <TaskIcon icon="LockIcon" size={24} className="text-primary" />
            </div>

            <div className="flex flex-col gap-2">
              <Typography variant="h2" className="font-heading text-text !font-bold">
                {t('auth.reset-password.reset')}
              </Typography>

              <Typography variant="body-sm" className="text-text-muted">
                {t('auth.reset-password.reset-desc')}
              </Typography>
            </div>
          </div>

          <ResetPasswordForm handleSubmit={handleSubmit} />

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
        </>
      )}
    </div>
  );
}
