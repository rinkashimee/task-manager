import TaskIcon from '@/components/icons/TaskIcon';
import Button from '@/components/ui/Button/Button';
import Typography from '@/components/ui/Typography/Typography';
import { cn } from '@/lib/utils/utils';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ActionMenuProps {
  name: string;
  isCompleted?: boolean;
  onView: () => void;
  onEdit: () => void;
  onComplete: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
}

export default function ActionMenu(props: ActionMenuProps) {
  const { name, isCompleted, onView, onEdit, onComplete, onDuplicate, onDelete } = props;

  const { t } = useTranslation();

  type MenuPlacement = 'top' | 'bottom';

  const [isOpen, setIsOpen] = useState(false);
  const [placement, setPlacement] = useState<MenuPlacement>('bottom');

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !triggerRef.current || !menuRef.current) return;

    const updatePlacement = () => {
      const triggerRect = triggerRef.current!.getBoundingClientRect();
      const menuHeight = menuRef.current!.offsetHeight;

      const spaceBelow = window.innerHeight - triggerRect.bottom;
      const spaceAbove = triggerRect.top;

      setPlacement(spaceBelow < menuHeight + 8 && spaceAbove > spaceBelow ? 'top' : 'bottom');
    };

    updatePlacement();

    window.addEventListener('resize', updatePlacement);
    window.addEventListener('scroll', updatePlacement, true);

    return () => {
      window.removeEventListener('resize', updatePlacement);
      window.removeEventListener('scroll', updatePlacement, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside);

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside);
    };
  }, [isOpen]);

  const handleAction = (callback: () => void) => {
    callback();
    setIsOpen(false);
  };

  return (
    <div ref={containerRef} className="relative inline-flex">
      <Button
        ref={triggerRef}
        variant="ghost"
        aria-label="Task actions"
        aria-haspopup="menu"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((prev) => !prev)}
        className="text-text hover:bg-primary/10 border-primary flex size-8 items-center justify-center rounded-md transition-colors focus:border"
      >
        <TaskIcon size={16} icon="DotsThreeIcon" />
      </Button>

      {isOpen && (
        <div
          ref={menuRef}
          role="menu"
          className={cn(
            'bg-card absolute right-0 z-50',
            'border-border w-50 rounded-md border p-1.5 shadow-sm',
            placement === 'top' ? 'bottom-full mb-1' : 'top-full mt-1'
          )}
        >
          <Button
            variant="ghost"
            role="menuitem"
            onClick={() => handleAction(onView)}
            className="hover:bg-primary/10 text-text !w-full !justify-start gap-2 rounded-md px-3 py-2 text-left text-xs"
          >
            <TaskIcon size={14} icon="EyeIcon" />

            <Typography variant="caption">{t('common.view', { name: name })}</Typography>
          </Button>

          <Button
            variant="ghost"
            role="menuitem"
            onClick={() => handleAction(onEdit)}
            className="hover:bg-primary/10 text-text !w-full !justify-start gap-2 rounded-md px-3 py-2 text-left text-xs"
          >
            <TaskIcon size={14} icon="PencilIcon" />

            <Typography variant="caption">{t('common.edit', { name: name })}</Typography>
          </Button>

          {!isCompleted && (
            <Button
              variant="ghost"
              role="menuitem"
              onClick={() => handleAction(onComplete)}
              className="hover:bg-primary/10 text-text !w-full !justify-start gap-2 rounded-md px-3 py-2 text-left text-xs"
            >
              <TaskIcon size={14} icon="CheckIcon" />

              <Typography variant="caption">{t('common.mark-completed')}</Typography>
            </Button>
          )}

          <Button
            variant="ghost"
            role="menuitem"
            onClick={() => handleAction(onDuplicate)}
            className="hover:bg-primary/10 text-text !w-full !justify-start gap-2 rounded-md px-3 py-2 text-left text-xs"
          >
            <TaskIcon size={14} icon="CopyIcon" />

            <Typography variant="caption">{t('common.duplicate')}</Typography>
          </Button>

          <div className="border-border my-1 border-t" />

          <Button
            variant="ghost"
            role="menuitem"
            onClick={() => handleAction(onDelete)}
            className="hover:bg-danger/10 text-danger !w-full !justify-start gap-2 rounded-md px-3 py-2 text-left text-xs"
          >
            <TaskIcon size={14} icon="TrashIcon" />

            <Typography variant="caption">{t('common.delete')}</Typography>
          </Button>
        </div>
      )}
    </div>
  );
}
