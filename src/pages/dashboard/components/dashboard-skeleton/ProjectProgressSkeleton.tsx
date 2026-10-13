import Skeleton from '@/components/ui/Skeleton/Skeleton';

export default function ProjectProgressSkeleton() {
  return (
    <div className="flex flex-col">
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} className="flex flex-col gap-2.5 px-2 py-2">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-2">
              <Skeleton className="size-10 shrink-0 rounded-lg" />

              <div className="flex min-w-0 flex-col gap-2">
                <Skeleton className="h-3.5 w-32 max-w-full" />
                <Skeleton className="h-3 w-24 max-w-full" />
              </div>
            </div>

            <Skeleton className="h-3.5 w-10 shrink-0" />
          </div>

          <Skeleton className="h-2 w-full rounded-full" />
        </div>
      ))}
    </div>
  );
}
