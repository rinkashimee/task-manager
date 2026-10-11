import { useState } from 'react';
import type { ConfirmationModalProps, ConfirmationVariant } from './ConfirmationModal.types';
import type { IconType } from '@/components/icons/TaskIcon';
import Modal from '../Modal/Modal';
import { cn } from '@/lib/utils/utils';
import TaskIcon from '@/components/icons/TaskIcon';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';

const confirmationVariants: Record<
  ConfirmationVariant,
  {
    icon: IconType;
    iconClassName: string;
    backgroundClassName: string;
    buttonClassName: string;
  }
> = {
  danger: {
    icon: 'TrashIcon',
    iconClassName: 'text-danger',
    backgroundClassName: 'bg-danger/10',
    buttonClassName:
      'h-9 gap-2 px-4 font-sans bg-danger text-xs text-text-inverse hover:bg-danger/90',
  },
  warning: {
    icon: 'WarningIcon',
    iconClassName: 'text-warning',
    backgroundClassName: 'bg-warning/10',
    buttonClassName:
      'h-9 gap-2 px-4 font-sans bg-warning text-xs text-text-inverse hover:bg-warning/90',
  },
  info: {
    icon: 'InfoIcon',
    iconClassName: 'text-info',
    backgroundClassName: 'bg-info/10',
    buttonClassName: 'h-9 gap-2 px-4 font-sans bg-info text-xs text-text-inverse hover:bg-info/90',
  },
  success: {
    icon: 'CheckCircleIcon',
    iconClassName: 'text-success',
    backgroundClassName: 'bg-success/10',
    buttonClassName:
      'h-9 gap-2 px-4 font-sans bg-success text-xs text-text-inverse hover:bg-success/90',
  },
  default: {
    icon: 'CopyIcon',
    iconClassName: 'text-primary',
    backgroundClassName: 'bg-primary/10',
    buttonClassName:
      'h-9 gap-2 px-4 font-sans bg-primary text-xs text-text-inverse hover:bg-primary/90',
  },
};

export default function ConfirmationModal(props: ConfirmationModalProps) {
  const {
    open,
    onClose,
    onConfirm,
    title,
    description,
    variant = 'info',
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    loading = false,
  } = props;

  const { t } = useTranslation();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const config = confirmationVariants[variant];

  const isLoading = loading || isSubmitting;

  const handleConfirm = async () => {
    if (isLoading) return;

    setIsSubmitting(true);

    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error('Confirmation failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
        if (!isLoading) onClose();
      }}
      title={title}
      size="md"
      closeOnOverlayClick={false}
      closeOnEscape={false}
    >
      <div className="p-6">
        <div className="flex flex-col items-center text-center">
          <div
            className={cn(
              'mb-4 flex size-13 items-center justify-center rounded-full',
              config.backgroundClassName
            )}
          >
            <TaskIcon icon={config.icon} size={24} className={config.iconClassName} />
          </div>

          {description && (
            <Typography as="p" variant="body-sm" className="text-text-muted">
              {description}
            </Typography>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            disabled={isLoading}
            onClick={onClose}
            className="h-9 gap-2 px-4 font-sans text-xs"
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            variant="primary"
            disabled={isLoading}
            onClick={handleConfirm}
            className={config.buttonClassName}
          >
            {isLoading ? t('common.processing') : confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
