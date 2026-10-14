import Form from '@/components/ui/Form';
import type { ForgotPasswordFormTypes } from '../types/ForgotPassword.types';
import Input from '@/components/ui/Input/Input';
import Button from '@/components/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import Typography from '@/components/ui/Typography/Typography';

interface ForgotPasswordFormProps {
  handleSubmit: (values: ForgotPasswordFormTypes) => void;
}

export default function ForgotPasswordForm(props: ForgotPasswordFormProps) {
  const { handleSubmit } = props;

  const { t } = useTranslation();

  return (
    <Form<ForgotPasswordFormTypes> initialValues={{ email: '' }} onSubmit={handleSubmit}>
      <Form.Item
        name="email"
        label={t('auth.forgot-pass.form.email')}
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
          placeholder={t('auth.forgot-pass.placeholder.email')}
          autoComplete="email"
        />
      </Form.Item>

      <Button type="submit" variant="primary" className="mt-2 h-10 w-full gap-2 px-4">
        <Typography as="p" variant="caption" className="truncate font-semibold">
          {t('common.reset-link')}
        </Typography>
      </Button>
    </Form>
  );
}
