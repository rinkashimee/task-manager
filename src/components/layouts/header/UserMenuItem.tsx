import type { IconType } from '@/components/icons/TaskIcon';
import TaskIcon from '@/components/icons/TaskIcon';
import Button from '@/components/ui/Button/Button';
import Typography from '@/components/ui/Typography/Typography';
import { cn } from '@/lib/utils/utils';

interface UserMenuItemProps {
  icon: IconType;
  label: string;
  danger?: boolean;
  classname?: string;
  onClick?: () => void;
}

export default function UserMenuItem(props: UserMenuItemProps) {
  const { icon, label, danger, classname, onClick } = props;

  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={cn(
        'w-full justify-start gap-3 px-3 py-2',
        'text-text hover:bg-primary/10 hover:text-primary',
        danger && 'text-danger hover:bg-danger/10 hover:text-danger',
        classname
      )}
    >
      <TaskIcon icon={icon} size={18} />

      <Typography as="p" variant="caption" className="font-sans font-medium">
        {label}
      </Typography>
    </Button>
  );
}
