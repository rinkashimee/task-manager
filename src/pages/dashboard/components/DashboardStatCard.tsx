import type { IconType } from '@/components/icons/TaskIcon';
import TaskIcon from '@/components/icons/TaskIcon';
import Typography from '@/components/ui/Typography/Typography';
import { cn } from '@/lib/utils/utils';

interface DashboardStatCardProps {
  title: string;
  value: number;
  icon: IconType;
  iconClassName?: string;
  backgroundClassName?: string;
}

export default function DashboardStatCard(props: DashboardStatCardProps) {
  const { title, value, icon, iconClassName, backgroundClassName } = props;

  return (
    <div className="border-border bg-card flex items-center gap-4 rounded-md border p-4">
      <div
        className={cn(
          'flex size-11 shrink-0 items-center justify-center rounded-xl',
          backgroundClassName
        )}
      >
        <TaskIcon icon={icon} size={22} className={iconClassName} weight="bold" />
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <Typography variant="body-sm" className="text-text-muted font-semibold">
          {title}
        </Typography>

        <Typography variant="body-lg" className="text-text font-bold">
          {value}
        </Typography>
      </div>
    </div>
  );
}
