import { sidebarItems } from '@/config/sidebar';
import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import TaskIcon from '../../icons/TaskIcon';
import Typography from '../../ui/Typography/Typography';
import { useTranslation } from 'react-i18next';

export default function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside className="bg-surface border-border relative flex h-screen w-[260px] flex-col border-r px-5 py-6">
      <div className="pointer-events-none absolute -top-30 left-1/2 h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-30 left-1/2 h-[220px] w-[220px] -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />

      <SidebarLogo />

      <nav className="mt-10 flex-1 space-y-3">
        {sidebarItems.map((item, index) => (
          <SidebarItem key={index} label={item.labelKey} icon={item.icon} path={item.path} />
        ))}
      </nav>

      <div className="mb-10 space-y-1">
        <TaskIcon size={28} icon="MagicWandIcon" color="var(--primary)" />

        <Typography variant="body-sm" className="text-text-muted font-sans whitespace-pre-line">
          {t('sidebar.footer')}
        </Typography>
      </div>
    </aside>
  );
}
