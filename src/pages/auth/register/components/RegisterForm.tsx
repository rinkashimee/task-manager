import Form from '@/components/ui/Form';
import type { RegisterFormTypes } from '../types/Register.types';
import { useTranslation } from 'react-i18next';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import Typography from '@/components/ui/Typography/Typography';

interface RegisterFormProps {
  handleSubmit: (values: RegisterFormTypes) => void;
}

export default function RegisterForm(props: RegisterFormProps) {
  const { handleSubmit } = props;

  const { t } = useTranslation();

  return (
    <Form<RegisterFormTypes> onSubmit={handleSubmit}>
      <Form.Item
        name="name"
        label={t('auth.register.form.name')}
        rules={[{ required: true }, { min: 2 }, { max: 100 }]}
      >
        <Input
          type="text"
          icon="UserIcon"
          placeholder={t('auth.register.placeholder.name')}
          autoComplete="name"
        />
      </Form.Item>

      <Form.Item
        name="email"
        label={t('auth.register.form.email')}
        rules={[
          { required: true },
          {
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          },
        ]}
      >
        <Input
          type="email"
          icon="EnvelopeIcon"
          placeholder={t('auth.register.placeholder.email')}
          autoComplete="email"
        />
      </Form.Item>

      <Form.Item
        name="password"
        label={t('auth.register.form.password')}
        rules={[{ required: true }, { min: 8 }]}
      >
        <Input
          type="password"
          icon="LockIcon"
          placeholder={t('auth.register.placeholder.password')}
          autoComplete="new-password"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label={t('auth.register.form.confirm-pass')}
        rules={[{ required: true }]}
      >
        <Input
          type="password"
          icon="LockIcon"
          placeholder={t('auth.register.placeholder.confirm-pass')}
          autoComplete="new-password"
        />
      </Form.Item>

      <Button type="submit" className="mt-2 h-10 w-full gap-2 px-4">
        <Typography as="p" variant="caption" className="truncate font-semibold">
          {t('common.create-acc')}
        </Typography>
      </Button>
    </Form>
  );
}
