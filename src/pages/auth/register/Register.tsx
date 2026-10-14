import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Typography from '@/components/ui/Typography/Typography';
import taskManagerLogo from '@/assets/task-manager-logo.svg';
import type { RegisterFormTypes } from './types/Register.types';
import RegisterForm from './components/RegisterForm';

export default function Register() {
  const { t } = useTranslation();

  const handleSubmit = (values: RegisterFormTypes) => {
    if (values.password !== values.confirmPassword) {
      // TODO: Display a validation error using your Form component
      return;
    }

    // TODO: Integrate Spring Boot registration API
    console.log(values);
  };

  return (
    <div className="flex w-full max-w-sm flex-col gap-6">
      <div className="flex flex-col items-center gap-2 lg:hidden">
        <img src={taskManagerLogo} alt="Task Manager Logo" className="size-12" />

        <Typography variant="h3" className="font-heading text-text !font-bold">
          {t('auth.brand.title')}
        </Typography>
      </div>

      <div className="flex flex-col gap-2">
        <Typography variant="h2" className="font-heading text-text !font-bold">
          {t('auth.register.create')}
        </Typography>

        <Typography variant="body-sm" className="text-text-muted">
          {t('auth.register.desc')}
        </Typography>
      </div>

      <RegisterForm handleSubmit={handleSubmit} />

      <Typography variant="caption" className="text-text-muted text-center">
        {t('auth.register.already-have-acc')}

        <Link to="/login" className="text-primary font-semibold hover:underline">
          {t('common.sign-in')}
        </Link>
      </Typography>
    </div>
  );
}
