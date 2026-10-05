import { useTranslation } from 'react-i18next';

export function App() {
  const { t } = useTranslation();

  return (
    <aside>
      <div>{t('sidebar.logo')}</div>
    </aside>
  );
}
