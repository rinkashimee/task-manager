import Typography from '@/components/ui/Typography/Typography';
import UserAvatar from './UserAvatar';

interface UserDropdownHeaderProps {
  name: string;
  email: string;
  avatarUrl?: string | null;
}

export default function UserDropdownHeader(props: UserDropdownHeaderProps) {
  const { name, email, avatarUrl } = props;

  return (
    <div className="flex items-center gap-3 px-2 py-1">
      <UserAvatar name={name} avatarUrl={avatarUrl} size="md" />

      <div className="min-w-0">
        <Typography variant="body-sm" className="text-text">
          {name}
        </Typography>

        <Typography as="p" variant="caption" className="text-text-muted truncate">
          {email}
        </Typography>
      </div>
    </div>
  );
}
