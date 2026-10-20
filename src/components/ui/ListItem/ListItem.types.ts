import type { ReactNode } from 'react';

export interface ListItemProps {
  title: string;
  description?: string | null;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
}
