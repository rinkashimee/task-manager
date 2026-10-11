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
    headerVariant = 'default',
    headerContent,
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
        aria-label={title || 'Details'}
        onMouseDown={(event) => event.stopPropagation()}
        className={cn(
          'bg-card border-border w-full overflow-visible rounded-md border shadow-sm',
          modalSizes[size],
          className
        )}
      >
        <div
          className={cn(
            'flex items-start justify-between gap-4 px-4 py-3',
            headerVariant === 'default' && 'border-border items-center border-b',
            headerVariant === 'view' && 'pt-5'
          )}
        >
          <div className="min-w-0 flex-1">
            {headerVariant === 'view' && headerContent ? (
              headerContent
            ) : (
              <>
                <Typography as="h2" variant="body-lg" className="text-text font-semibold">
                  {title}
                </Typography>

                {caption && (
                  <Typography as="p" variant="caption" className="text-text-muted mt-1">
                    {caption}
                  </Typography>
                )}
              </>
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
