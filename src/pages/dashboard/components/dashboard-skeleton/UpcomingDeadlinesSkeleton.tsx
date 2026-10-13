import Skeleton from '@/components/ui/Skeleton/Skeleton';
import type { TaskTypes } from '@/pages/my-tasks/types/Task.types';

interface UpcomingDeadlinesSkeletonProps {
  data: TaskTypes[];
}

export default function UpcomingDeadlinesSkeleton(props: UpcomingDeadlinesSkeletonProps) {
  const { data } = props;

  return (
    <div className="flex flex-col">
      {data.map((_, index) => (
        <div
          key={index}
          className="border-border flex h-15 items-center gap-3 border-b px-2 last:border-b-0"
        >
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <Skeleton className="size-11 shrink-0 rounded-lg" />

            <div className="flex min-w-0 flex-col gap-2">
              <Skeleton className="h-3 w-28 max-w-full" />
              <Skeleton className="h-3 w-18 max-w-full" />
            </div>
          </div>

          <div className="flex min-w-0 flex-1 items-center justify-center">
            <Skeleton className="h-5 w-12 rounded-full" />
          </div>

          <div className="flex w-8 shrink-0 items-center justify-center">
            <Skeleton className="size-5 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}
