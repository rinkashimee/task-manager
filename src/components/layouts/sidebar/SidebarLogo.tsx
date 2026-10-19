import { useTranslation } from 'react-i18next';
import taskManagerLogo from '@/assets/task-manager-logo.svg';
import Typography from '../../ui/Typography/Typography';

export default function SidebarLogo() {
  const { t } = useTranslation();

  return (
    <div className="flex min-w-0 items-center gap-2 md:mt-3 md:justify-center xl:justify-start">
      <img src={taskManagerLogo} alt="Task Manager" className="h-[30px] w-[30px] shrink-0" />

      <Typography
        as="h3"
        variant="body-lg"
        className="text-text-inverse !font-bold whitespace-nowrap md:hidden xl:block"
      >
        {t('sidebar.logo')}
      </Typography>
    </div>
  );
}
