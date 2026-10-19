import { sidebarItems } from '@/config/sidebar';
import SidebarItem from './SidebarItem';
import SidebarLogo from './SidebarLogo';
import TaskIcon from '../../icons/TaskIcon';
import Typography from '../../ui/Typography/Typography';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils/utils';
import Button from '@/components/ui/Button/Button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar(props: SidebarProps) {
  const { isOpen, onClose } = props;

  const { t } = useTranslation();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        id="mobile-sidebar"
        className={cn(
          'bg-surface fixed inset-y-0 left-0 z-50 flex w-[260px] border-r border-white/10',
          'shrink-0 flex-col px-5 py-6 transition-transform duration-300',
          'bg-[linear-gradient(160deg,var(--surface)_0%,var(--surface-accent)_100%)]',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'md:relative md:z-auto md:w-[72px] md:translate-x-0 md:px-3',
          'xl:w-[260px] xl:px-5'
        )}
      >
        <div className="flex items-center justify-between gap-2 md:justify-center xl:justify-start">
          <SidebarLogo />

          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            aria-label="Close sidebar"
            className="text-text-inverse shrink-0 p-2 md:hidden"
          >
            <TaskIcon icon="XIcon" size={20} />
          </Button>
        </div>

        <nav className="mt-10 flex-1 space-y-3">
          {sidebarItems.map((item, index) => (
            <SidebarItem
              key={index}
              label={item.labelKey}
              icon={item.icon}
              path={item.path}
              onClick={onClose}
            />
          ))}
        </nav>

        <div className="mb-10 space-y-1 md:hidden xl:block">
          <TaskIcon size={28} icon="MagicWandIcon" className="text-primary" />

          <Typography variant="body-sm" className="text-text-muted font-sans whitespace-pre-line">
            {t('sidebar.footer')}
          </Typography>
        </div>
      </aside>
    </>
  );
}
