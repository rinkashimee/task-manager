import type { IconType } from '@/components/icons/TaskIcon';
import type { ParseKeys } from 'i18next';
import type { ReactNode } from 'react';

export interface DropdownOption {
  label?: string;
  labels?: ParseKeys;
  value: string;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface DropdownProps {
  name?: string;
  id?: string;
  value?: string;
  icon?: IconType;
  hideIcon?: boolean;
  defaultValue?: string;
  placeholder?: string;
  options: DropdownOption[];
  onChange?: (value: string) => void;
  error?: boolean;
  disabled?: boolean;
  className?: string;
}
