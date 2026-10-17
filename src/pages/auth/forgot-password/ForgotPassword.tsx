import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import taskManagerLogo from '@/assets/task-manager-logo.svg';
import Typography from '@/components/ui/Typography/Typography';
import TaskIcon from '@/components/icons/TaskIcon';

import type { ForgotPasswordFormTypes } from './types/ForgotPassword.types';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import { cn } from '@/lib/utils/utils';

export default function ForgotPassword() {
  const { t } = useTranslation();

  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (values: ForgotPasswordFormTypes) => {
    // TODO: Integrate Spring Boot forgot password API
    // Set emailSent(true) only after the API successfully accepts the request.
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col items-center gap-2 lg:hidden">
        <img src={taskManagerLogo} alt="Task Manager Logo" className="size-12" />

        <Typography variant="h3" className="font-heading text-text !font-bold">
          {t('auth.brand.title')}
        </Typography>
      </div>

      {!emailSent ? (
        <>
          <div className="flex flex-col gap-3">
            <div className="bg-primary/10 flex size-12 items-center justify-center rounded-xl">
              <TaskIcon icon="LockIcon" size={24} className="text-primary" />
            </div>

            <div className="flex flex-col gap-2">
              <Typography variant="h2" className="font-heading text-text !font-bold">
                {t('auth.forgot-pass.forgot')}
              </Typography>

              <Typography variant="body-sm" className="text-text-muted">
                {t('auth.forgot-pass.desc')}
              </Typography>
            </div>
          </div>

          <ForgotPasswordForm handleSubmit={handleSubmit} />
        </>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="bg-success/10 flex size-12 items-center justify-center rounded-xl">
            <TaskIcon icon="CheckCircleIcon" size={24} className="text-success" />
          </div>

          <Typography variant="h2" className="font-heading text-text !font-bold">
            {t('auth.forgot-pass.check-email')}
          </Typography>

          <Typography variant="body-sm" className="text-text-muted">
            {t('auth.forgot-pass.check-email-desc')}
          </Typography>
        </div>
      )}

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
    </div>
  );
}
