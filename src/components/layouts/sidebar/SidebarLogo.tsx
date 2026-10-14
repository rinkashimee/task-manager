import { useTranslation } from 'react-i18next';
import taskManagerLogo from '@/assets/task-manager-logo.svg';
import Typography from '../../ui/Typography/Typography';

export default function SidebarLogo() {
  const { t } = useTranslation();

  return (
    <div className="mt-3 flex items-center gap-2">
      <img src={taskManagerLogo} alt="Task Manager" className="h-[30px] w-[30px]" />

      <Typography as="h3" variant="body-lg" className="text-text-inverse !font-bold">
        {t('sidebar.logo')}
      </Typography>
    </div>
  );
}
