import type { IconType } from '@/components/icons/TaskIcon';
import type { ParseKeys } from 'i18next';

export interface FeatureItemsTypes {
  title: ParseKeys;
  description: ParseKeys;
  icon: IconType;
}

export interface InformationTypes {
  label: ParseKeys;
  value: ParseKeys;
  version?: string;
}
