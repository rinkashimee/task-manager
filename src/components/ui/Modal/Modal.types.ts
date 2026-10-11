import type { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl';

export type ModalHeaderVariant = 'default' | 'view';

export interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: ModalSize;
  title: string;
  caption?: string;
  headerVariant?: ModalHeaderVariant;
  headerContent?: ReactNode;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
}
