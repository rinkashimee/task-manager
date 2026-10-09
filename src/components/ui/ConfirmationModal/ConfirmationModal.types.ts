import type { ReactNode } from 'react';

export type ConfirmationVariant = 'danger' | 'warning' | 'info' | 'success';

export interface ConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  description?: ReactNode;
  variant?: ConfirmationVariant;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
}
