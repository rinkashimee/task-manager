import type { ParseKeys } from 'i18next';

export interface SpinnerProps {
  className?: string;
  message?: string;
}

export interface SpinnerContextValue {
  showLoading: (key?: ParseKeys) => void;
  hideLoading: () => void;
}
