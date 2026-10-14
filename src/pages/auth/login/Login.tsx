import { Link } from 'react-router-dom';
import taskManagerLogo from '@/assets/task-manager-logo.svg';
import Typography from '@/components/ui/Typography/Typography';
import { useTranslation } from 'react-i18next';
import type { LoginFormTypes } from './types/Login.types';
import LoginForm from './components/LoginForm';

export default function Login() {
  const { t } = useTranslation();

  const handleSubmit = (data: LoginFormTypes) => {
    // TODO: Integrate Spring Boot login API
    console.log(data);
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-7">
      <div className="flex flex-col items-center gap-2 lg:hidden">
        <img src={taskManagerLogo} alt="Task Manager Logo" className="size-12" />

        <Typography variant="h3" className="font-heading text-text !font-bold">
          {t('auth.brand.title')}
        </Typography>
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="h2" className="font-heading text-text !font-bold">
          {t('auth.login.welcome')}
        </Typography>

        <Typography variant="body-sm" className="text-text-muted">
          {t('auth.login.desc')}
        </Typography>
      </div>

      <LoginForm handleSubmit={handleSubmit} />

      <Typography variant="caption" className="text-text-muted text-center">
        {t('auth.login.no-account')}

        <Link to="/register" className="text-primary font-semibold hover:underline">
          {t('common.sign-up')}
        </Link>
      </Typography>
    </div>
  );
}
