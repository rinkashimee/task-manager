import type { IconType } from '@/components/icons/TaskIcon';
import type { ParseKeys } from 'i18next';

export type AppearanceVariant = 'compact' | 'full';

export interface AppearanceSettingsProps {
  variant?: AppearanceVariant;
}

export interface ThemeOptionsType {
  value: string;
  label: ParseKeys;
  description: ParseKeys;
  icon: IconType;
}
