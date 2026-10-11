import type { BadgeVariant } from '@/components/ui/Badge/Badge.types';

export const statusVariants: Record<string, BadgeVariant> = {
  todo: 'default',
  'in-progress': 'info',
  completed: 'success',
  'on-hold': 'danger',
};

export const priorityVariants: Record<string, BadgeVariant> = {
  low: 'success',
  medium: 'warning',
  high: 'danger',
};
