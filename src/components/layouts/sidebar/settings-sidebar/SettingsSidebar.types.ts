import type { IconType } from '@/components/icons/TaskIcon';
import type { ParseKeys } from 'i18next';

export interface SettingsNavItem {
  labelKey: ParseKeys;
  path: string;
  icon: IconType;
  description: ParseKeys;
}
