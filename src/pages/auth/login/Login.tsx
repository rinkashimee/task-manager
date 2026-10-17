import { Link, useNavigate } from 'react-router-dom';
import taskManagerLogo from '@/assets/task-manager-logo.svg';
import Typography from '@/components/ui/Typography/Typography';
import { useTranslation } from 'react-i18next';
import type { LoginFormTypes } from './types/Login.types';
import LoginForm from './components/LoginForm';
import { useAuth } from '../hooks/useAuth';
import { useAuthSession } from '../hooks/useAuthSession';

export default function Login() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setAuthenticated } = useAuthSession();

  const { login, isLogin } = useAuth();

  const handleSubmit = async (data: LoginFormTypes) => {
    const result = await login(data);

    if (result.status === 'unverified') {
      const email = data.email.trim().toLowerCase();

      localStorage.setItem('pendingVerificationEmail', email);

      navigate('/verify-email', {
        state: {
          email,
          mode: 'login-recovery',
        },
      });

      return;
    }

    if (result.status === 'success') {
      localStorage.removeItem('pendingVerificationEmail');

      const { id, name, email, role, profileImage } = result.data;

      setAuthenticated({
        id,
        name,
        email,
        role,
        profileImage,
      });

      navigate('/dashboard', { replace: true });
    }
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

      <LoginForm isLogin={isLogin} handleSubmit={handleSubmit} />

      <Typography variant="caption" className="text-text-muted text-center">
        {t('auth.login.no-account')}

        <Link to="/register" className="text-primary font-semibold hover:underline">
          {t('common.sign-up')}
        </Link>
      </Typography>
    </div>
  );
}
