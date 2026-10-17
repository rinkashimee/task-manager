import Button from '@/components/ui/Button/Button';
import Form from '@/components/ui/Form';
import Input from '@/components/ui/Input/Input';
import Typography from '@/components/ui/Typography/Typography';
import { useTranslation } from 'react-i18next';
import type { AccountFormTypes } from '../types/Account.types';
import type { ChangeEvent, RefObject } from 'react';
import { useAuthSession } from '@/pages/auth/hooks/useAuthSession';

interface AccountFormProps {
  fileInputRef: RefObject<HTMLInputElement | null>;
  handleSubmit: (data: AccountFormTypes) => void;
  handleUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  isUpdating: boolean;
}

export default function AccountForm(props: AccountFormProps) {
  const { fileInputRef, isUpdating, handleSubmit, handleUpload } = props;

  const { t } = useTranslation();
  const { user } = useAuthSession();

  return (
    <Form<AccountFormTypes>
      key={user?.id ?? 'account'}
      initialValues={{
        name: user?.name ?? '',
        email: user?.email ?? '',
        role: user?.role ?? '',
      }}
      onSubmit={handleSubmit}
    >
      <Input
        hideIcon
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/jpeg,image/png,image/gif"
        onChange={handleUpload}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Form.Item
          name="name"
          label={t('settings.account-setting.form.name')}
          rules={[{ required: true, min: 2, max: 100 }]}
        >
          <Input placeholder={t('settings.account-setting.placeholder.name')} hideIcon />
        </Form.Item>

        <Form.Item name="email" label={t('settings.account-setting.form.email')}>
          <Input type="email" hideIcon disabled />
        </Form.Item>

        <Form.Item name="role" label={t('settings.account-setting.form.role')}>
          <Input hideIcon disabled />
        </Form.Item>
      </div>

      <div className="mt-5 flex justify-end">
        <Button
          variant="primary"
          type="submit"
          disabled={isUpdating}
          className="h-9 gap-2 px-4 font-sans"
        >
          <Typography as="p" variant="caption" className="truncate">
            {t('common.save-changes')}
          </Typography>
        </Button>
      </div>
    </Form>
  );
}
