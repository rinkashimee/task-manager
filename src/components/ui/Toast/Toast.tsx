import type { IconType } from '@/components/icons/TaskIcon';
import type { ToastItem, ToastVariant } from './Toast.types';
import { useEffect } from 'react';
import TaskIcon from '@/components/icons/TaskIcon';
import Typography from '../Typography/Typography';
import { cn } from '@/lib/utils/utils';

interface ToastProps {
  toast: ToastItem;
  onClose: (id: string) => void;
}

const icons: Record<ToastVariant, IconType> = {
  success: 'CheckCircleIcon',
  error: 'XCircleIcon',
  warning: 'WarningIcon',
  info: 'InfoIcon',
};

const background: Record<ToastVariant, string> = {
  success: 'bg-success',
  error: 'bg-danger',
  warning: 'bg-warning',
  info: 'bg-info',
};

export default function Toast(props: ToastProps) {
  const { toast, onClose } = props;

  const Icon = icons[toast.variant];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      onClose(toast.id);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div
      role={toast.variant === 'error' ? 'alert' : 'status'}
      className={cn(
        'border-border flex w-full items-start gap-3 rounded-md border p-4 shadow-md',
        background[toast.variant]
      )}
    >
      <TaskIcon icon={Icon} className={`text-text-inverse mt-0.5 size-5 shrink-0`} />

      <div className="min-w-0 flex-1">
        <Typography variant="body-sm" className="text-text-inverse font-semibold">
          {toast.title}
        </Typography>

        {toast.description && (
          <Typography variant="caption" className="text-text-inverse">
            {toast.description}
          </Typography>
        )}
      </div>

      <button
        type="button"
        onClick={() => onClose(toast.id)}
        className="text-text-inverse cursor-pointer"
        aria-label="Close notification"
      >
        <TaskIcon icon="XIcon" className="size-4" />
      </button>
    </div>
  );
}
