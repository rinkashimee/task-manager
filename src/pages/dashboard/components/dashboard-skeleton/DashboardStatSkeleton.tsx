import Skeleton from '@/components/ui/Skeleton/Skeleton';

export default function DashboardStatSkeleton() {
  return (
    <div className="border-border bg-card flex min-w-0 items-center gap-2 rounded-lg border p-3 sm:gap-4 sm:p-4">
      <Skeleton className="size-9 shrink-0 rounded-xl sm:size-11" />

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <Skeleton className="h-3 w-full max-w-24" />
        <Skeleton className="h-7 w-full max-w-12" />
      </div>
    </div>
  );
}
