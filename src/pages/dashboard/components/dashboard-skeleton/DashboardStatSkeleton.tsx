import Skeleton from '@/components/ui/Skeleton/Skeleton';

export default function DashboardStatSkeleton() {
  return (
    <div className="border-border bg-card flex items-center gap-4 rounded-lg border p-4">
      <Skeleton className="size-11 shrink-0 rounded-xl" />

      <div className="flex flex-col gap-3">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-7 w-12" />
      </div>
    </div>
  );
}
