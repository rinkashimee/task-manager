import Typography from '@/components/ui/Typography/Typography';
import UserMenu from './UserMenu';

interface HeaderProps {
  title: string;
  caption: string;
}

export default function Header(props: HeaderProps) {
  const { title, caption } = props;

  return (
    <header className="border-border flex items-center justify-between border-b p-6">
      <div>
        <Typography as="h3" variant="body-lg" className="text-text font-heading truncate">
          {title}
        </Typography>

        <Typography variant="body-sm" className="text-text-muted truncate font-sans">
          {caption}
        </Typography>
      </div>

      <UserMenu name="Rinkaa" email="rinka.xxx@gmail.com" />
    </header>
  );
}
