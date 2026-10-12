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
    <div className="absolute inset-x-0 top-[41px] bottom-0 flex items-center justify-center">
      <div className="flex flex-col items-center text-center">
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
    </div>
  );
}
