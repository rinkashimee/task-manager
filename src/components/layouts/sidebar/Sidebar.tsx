import { sidebarItems } from '@/config/sidebar';
import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import TaskIcon from '../../icons/TaskIcon';
import Typography from '../../ui/Typography/Typography';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils/utils';

export default function Sidebar() {
  const { t } = useTranslation();

  return (
    <aside
      className={cn(
        'bg-surface border-border relative flex h-screen w-[260px] flex-col border-r px-5 py-6',
        'bg-[linear-gradient(160deg,var(--surface)_0%,var(--surface-accent)_100%)]'
      )}
    >
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
