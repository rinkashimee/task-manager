import TaskIcon, { type IconType } from '@/components/icons/TaskIcon';
import Typography from '../Typography/Typography';

interface TableEmptyStateProps {
  title: string;
  description: string;
  icon?: IconType;
}

export default function TableEmptyState(props: TableEmptyStateProps) {
  const { title, description, icon = 'ClipboardTextIcon' } = props;

  return (
    <div className="flex w-full flex-col items-center justify-center px-4 py-6 text-center">
      <div className="bg-primary/10 mb-3 flex size-12 items-center justify-center rounded-full">
        <TaskIcon icon={icon} size={24} className="text-primary" />
      </div>

      <Typography as="p" variant="body-sm" className="text-text font-semibold">
        {title}
      </Typography>

      <Typography as="p" variant="caption" className="text-text-muted mt-1">
        {description}
      </Typography>
    </div>
  );
}
