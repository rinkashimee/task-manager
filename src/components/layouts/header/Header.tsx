import Typography from '@/components/ui/Typography/Typography';
import UserMenu from './UserMenu';
import { useAuthSession } from '@/pages/auth/hooks/useAuthSession';
import { useOutletContext } from 'react-router-dom';
import TaskIcon from '@/components/icons/TaskIcon';
import type { DashboardLayoutContext } from '../DashboardLayout';
import Button from '@/components/ui/Button/Button';

interface HeaderProps {
  title: string;
  caption: string;
  hidden?: boolean;
}

export default function Header(props: HeaderProps) {
  const { title, caption, hidden } = props;

  const { user } = useAuthSession();
  const { openSidebar } = useOutletContext<DashboardLayoutContext>();

  return (
    <header
      className="border-border flex items-center justify-between gap-3 border-b px-4 py-4 sm:px-6 sm:py-6"
      hidden={hidden}
    >
      <div className="flex min-w-0 items-center gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={openSidebar}
          aria-label="Open sidebar"
          aria-controls="mobile-sidebar"
          className="text-text hover:bg-canvas shrink-0 rounded-md p-2 md:hidden"
        >
          <TaskIcon icon="ListIcon" size={20} />
        </Button>

        <div className="min-w-0">
          <Typography as="h3" variant="body-lg" className="text-text font-heading truncate">
            {title}
          </Typography>

          <Typography variant="body-sm" className="text-text-muted truncate font-sans">
            {caption}
          </Typography>
        </div>
      </div>

      <UserMenu
        name={user?.name ?? 'User'}
        email={user?.email ?? ''}
        avatarUrl={user?.profileImage}
      />
    </header>
  );
}
