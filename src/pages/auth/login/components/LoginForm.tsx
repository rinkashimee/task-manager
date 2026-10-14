import Form from '@/components/ui/Form';
import Input from '@/components/ui/Input/Input';
import type { LoginFormTypes } from '../types/Login.types';
import { Link } from 'react-router-dom';
import Button from '@/components/ui/Button/Button';
import Typography from '@/components/ui/Typography/Typography';
import { useTranslation } from 'react-i18next';

interface LoginFormProps {
  handleSubmit: (data: LoginFormTypes) => void;
}

export default function LoginForm(props: LoginFormProps) {
  const { handleSubmit } = props;

  const { t } = useTranslation();

  return (
    <Form<LoginFormTypes>
      key="new"
      initialValues={{
        email: '',
        password: '',
        rememberMe: true,
      }}
      onSubmit={handleSubmit}
    >
      <Form.Item
        name="email"
        label={t('auth.login.form.email')}
        rules={[{ required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ }]}
      >
        <Input type="email" placeholder={t('auth.login.placeholder.email')} icon="EnvelopeIcon" />
      </Form.Item>

      <Form.Item name="password" label={t('auth.login.form.password')} rules={[{ required: true }]}>
        <Input
          type="password"
          placeholder={t('auth.login.placeholder.password')}
          autoComplete="current-password"
          icon="LockIcon"
        />
      </Form.Item>

      <div className="flex items-center justify-between gap-3">
        <Form.Item name="rememberMe" label={t('auth.login.form.remember-me')} layout="horizontal">
          <Input type="checkbox" hideIcon />
        </Form.Item>

        <Link
          to="/forgot-password"
          className="text-primary font-sans text-xs font-medium hover:underline"
        >
          {t('common.forgot-pass')}
        </Link>
      </div>

      <Button type="submit" variant="primary" className="h-10 w-full gap-2 px-4 font-sans">
        <Typography as="p" variant="caption" className="truncate">
          {t('common.sign-in')}
        </Typography>
      </Button>
    </Form>
  );
}
