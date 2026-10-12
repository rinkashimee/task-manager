import type { BadgeVariant } from '@/components/ui/Badge/Badge.types';
import { PAGE_SIZE } from '@/constants/commonContants';

export const pageSize = PAGE_SIZE;

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
