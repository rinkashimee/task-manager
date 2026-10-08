import type { ModalProps, ModalSize } from './Modal.types';
import { cn } from '@/lib/utils/utils';
import { useEffect } from 'react';
import Typography from '../Typography/Typography';
import TaskIcon from '@/components/icons/TaskIcon';

const modalSizes: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-lg',
  lg: 'max-w-2xl',
  xl: 'max-w-4xl',
};

export default function Modal(props: ModalProps) {
  const {
    open,
    onClose,
    children,
    title,
    caption,
    size = 'md',
    closeOnOverlayClick = false,
    closeOnEscape = false,
    className,
  } = props;

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeOnEscape) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose, closeOnEscape]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={() => {
        if (closeOnOverlayClick) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        onMouseDown={(event) => event.stopPropagation()}
        className={cn(
          'bg-card border-border w-full overflow-visible rounded-md border shadow-sm',
          modalSizes[size],
          className
        )}
      >
        <div className="border-border flex items-center justify-between gap-4 border-b px-4 py-3">
          <div className="min-w-0">
            <Typography as="h2" variant="body-lg" className="text-text-primary font-semibold">
              {title}
            </Typography>

            {caption && (
              <Typography as="p" variant="caption" className="text-text-muted mt-1">
                {caption}
              </Typography>
            )}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className={cn(
              'text-text-muted hover:text-primary flex size-8 shrink-0 cursor-pointer',
              'items-center justify-center rounded-md transition-colors'
            )}
          >
            <TaskIcon icon="XIcon" size={18} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
