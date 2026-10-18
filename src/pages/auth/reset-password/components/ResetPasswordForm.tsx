import Form from '@/components/ui/Form';
import type { ResetPasswordFormTypes } from '../types/ResetPassword.types';
import { useTranslation } from 'react-i18next';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import Typography from '@/components/ui/Typography/Typography';

interface ResetPasswordFormProps {
  isResetPassword: boolean;
  handleSubmit: (values: ResetPasswordFormTypes) => void;
}

export default function ResetPasswordForm(props: ResetPasswordFormProps) {
  const { isResetPassword, handleSubmit } = props;

  const { t } = useTranslation();

  return (
    <Form<ResetPasswordFormTypes>
      initialValues={{
        newPassword: '',
        confirmPassword: '',
      }}
      onSubmit={handleSubmit}
    >
      <Form.Item
        name="newPassword"
        label={t('auth.reset-password.form.new-password')}
        rules={[{ required: true }, { min: 8 }, { max: 72 }]}
      >
        <Input
          type="password"
          icon="LockIcon"
          placeholder={t('auth.reset-password.placeholder.new-password')}
          autoComplete="new-password"
        />
      </Form.Item>

      <Form.Item
        name="confirmPassword"
        label={t('auth.reset-password.form.confirm-pass')}
        rules={[{ required: true }]}
      >
        <Input
          type="password"
          icon="LockIcon"
          placeholder={t('auth.reset-password.placeholder.confirm-pass')}
          autoComplete="new-password"
        />
      </Form.Item>

      <Button
        type="submit"
        variant="primary"
        disabled={isResetPassword}
        className="mt-2 h-10 w-full gap-2 px-4"
      >
        <Typography as="p" variant="caption" className="truncate font-semibold">
          {t('common.reset-password')}
        </Typography>
      </Button>
    </Form>
  );
}
