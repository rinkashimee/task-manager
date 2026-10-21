import type { ReactNode } from 'react';

export interface ListItemProps {
  title: string;
  description?: string | null;
  leading?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
}
