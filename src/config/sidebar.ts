import type { IconType } from '@/components/icons/TaskIcon';
import type { ParseKeys } from 'i18next';

export const sidebarItems = [
  {
    labelKey: 'sidebar.dashboard',
    icon: 'HouseLineIcon',
    path: '/dashboard',
  },
  {
    labelKey: 'sidebar.my-tasks',
    icon: 'CheckSquareIcon',
    path: '/my-tasks',
  },
  {
    labelKey: 'sidebar.projects',
    icon: 'FolderIcon',
    path: '/projects',
  },
  {
    labelKey: 'sidebar.settings',
    icon: 'GearIcon',
    path: '/settings',
  },
] satisfies {
  labelKey: ParseKeys;
  icon: IconType;
  path: string;
}[];
