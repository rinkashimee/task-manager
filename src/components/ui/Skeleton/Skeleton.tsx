import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils/utils';

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export default function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn('bg-canvas animate-pulse rounded-md', className)}
      {...props}
    />
  );
}
