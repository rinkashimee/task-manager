import Typography, { type TypographyVariant } from '@/components/ui/Typography/Typography';
import clsx from 'clsx';

type AvatarSize = 'sm' | 'md' | 'lg';

interface UserAvatarProps {
  name: string;
  avatarUrl?: string | null;
  size?: AvatarSize;
}

interface AvatarSizeConfig {
  container: string;
  initialVariant: TypographyVariant;
}

const avatarSizes: Record<AvatarSize, AvatarSizeConfig> = {
  sm: {
    container: 'size-8',
    initialVariant: 'body-sm',
  },
  md: {
    container: 'size-10',
    initialVariant: 'body',
  },
  lg: {
    container: 'size-12',
    initialVariant: 'body-lg',
  },
};

export default function UserAvatar(props: UserAvatarProps) {
  const { name, avatarUrl, size = 'sm' } = props;

  const initial = name.charAt(0).toUpperCase();
  const config = avatarSizes[size];

  return (
    <div
      className={clsx(
        'bg-primary flex items-center justify-center overflow-hidden rounded-full',
        config.container
      )}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt={`${name}'s profile`} className="h-full w-full object-cover" />
      ) : (
        <Typography
          as="span"
          variant={config.initialVariant}
          className="text-text-inverse font-sans"
        >
          {initial}
        </Typography>
      )}
    </div>
  );
}
