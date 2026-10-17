import Typography from '@/components/ui/Typography/Typography';
import UserMenu from './UserMenu';
import { useAuthSession } from '@/pages/auth/hooks/useAuthSession';

interface HeaderProps {
  title: string;
  caption: string;
  hidden?: boolean;
}

export default function Header(props: HeaderProps) {
  const { title, caption, hidden } = props;

  const { user } = useAuthSession();

  return (
    <header
      className="border-border flex items-center justify-between border-b p-6"
      hidden={hidden}
    >
      <div>
        <Typography as="h3" variant="body-lg" className="text-text font-heading truncate">
          {title}
        </Typography>

        <Typography variant="body-sm" className="text-text-muted truncate font-sans">
          {caption}
        </Typography>
      </div>

      <UserMenu name={user?.name ?? 'User'} email={user?.email ?? ''} />
    </header>
  );
}
