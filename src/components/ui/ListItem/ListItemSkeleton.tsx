import Skeleton from '@/components/ui/Skeleton/Skeleton';
import { useTranslation } from 'react-i18next';
import Typography from '../Typography/Typography';

interface ListItemSkeletonProps {
  rows?: number;
}

export default function ListItemSkeleton({ rows = 5 }: ListItemSkeletonProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3" role="status" aria-label="Loading items">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="bg-card border-border rounded-lg border p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-3/5" />
              <Skeleton className="h-3 w-4/5" />
            </div>

            <Skeleton className="size-6 shrink-0" />
          </div>

          <div className="mt-4 flex gap-2">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>

          <div className="border-border mt-4 flex items-center justify-between gap-3 border-t pt-3">
            <Skeleton className="h-3 w-28 max-w-[50%]" />
            <Skeleton className="h-3 w-24 max-w-[40%]" />
          </div>
        </div>
      ))}

      <Typography as="span" variant="caption" className="sr-only">
        {t('common.loading')}
      </Typography>
    </div>
  );
}
