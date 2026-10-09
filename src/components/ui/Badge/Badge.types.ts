import type { HTMLAttributes } from 'react';

export type BadgeVariant = 'default' | 'info' | 'success' | 'warning' | 'danger';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}
