import type { BadgeVariant } from '@/components/ui/Badge/Badge.types';

export const projectStatusVariants: Record<string, BadgeVariant> = {
  'not-started': 'default',
  'in-progress': 'info',
  completed: 'success',
  'on-hold': 'danger',
};

export const projectIcons = [
  {
    value: 'globe',
    icon: 'GlobeIcon',
    color: 'bg-primary/10 text-primary',
  },
  {
    value: 'code',
    icon: 'CodeIcon',
    color: 'bg-info/10 text-info',
  },
  {
    value: 'bookmark',
    icon: 'BookmarkSimpleIcon',
    color: 'bg-danger/10 text-danger',
  },
  {
    value: 'megaphone',
    icon: 'MegaphoneIcon',
    color: 'bg-success/10 text-success',
  },
  {
    value: 'layers',
    icon: 'StackIcon',
    color: 'bg-primary/10 text-primary',
  },
  {
    value: 'chart',
    icon: 'ChartBarIcon',
    color: 'bg-info/10 text-info',
  },
] as const;

export type ProjectIconType = (typeof projectIcons)[number]['value'];
