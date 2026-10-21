import Typography from '@/components/ui/Typography/Typography';
import { cn } from '@/lib/utils/utils';
import type { ListItemProps } from './ListItem.types';

export default function ListItem(props: ListItemProps) {
  const { title, description, leading, actions, children, className } = props;

  return (
    <div className={cn('bg-card border-border rounded-lg border p-4', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {leading && <div className="shrink-0">{leading}</div>}

          <div className="flex min-w-0 flex-1 flex-col">
            <Typography variant="body-sm" className="text-text font-sans font-semibold">
              {title}
            </Typography>

            {description && (
              <Typography variant="caption" className="text-text-muted mt-1">
                {description}
              </Typography>
            )}
          </div>
        </div>

        {actions && <div className="shrink-0">{actions}</div>}
      </div>

      {children && <div className="mt-4">{children}</div>}
    </div>
  );
}
