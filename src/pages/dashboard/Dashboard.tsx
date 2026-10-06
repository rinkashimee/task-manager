import Header from '@/components/layouts/header/Header';
import { getGreeting } from '@/lib/utils/utils';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { t } = useTranslation();

  const greeting = getGreeting();

  return (
    <>
      <Header
        title={t('dashboard.title', { data: t(greeting), user: 'Rinkaa' })}
        caption={t('dashboard.caption')}
      />
    </>
  );
}
