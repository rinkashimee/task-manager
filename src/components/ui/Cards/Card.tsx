import { cn } from '@/lib/utils/utils';
import type { ReactNode } from 'react';

interface CardProps {
  className: string;
  children: ReactNode;
}

export default function Card(props: CardProps) {
  const { className, children } = props;

  return <div className={cn('border-border bg-card rounded-md border', className)}>{children}</div>;
}
