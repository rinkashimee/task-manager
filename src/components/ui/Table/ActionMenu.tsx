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

  const [isOpen, setIsOpen] = useState(false);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen || !triggerRef.current || !menuRef.current) return;

    const trigger = triggerRef.current;
    const menu = menuRef.current;

    if (!menu.matches(':popover-open')) {
      menu.showPopover();
    }

    const updatePosition = () => {
      const rect = trigger.getBoundingClientRect();
      const menuHeight = menu.offsetHeight;
      const menuWidth = menu.offsetWidth;

      const gap = 4;
      const padding = 8;

      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      const openTop = spaceBelow < menuHeight + gap && spaceAbove > spaceBelow;

      const top = openTop ? rect.top - menuHeight - gap : rect.bottom + gap;

      const left = Math.max(
        padding,
        Math.min(rect.right - menuWidth, window.innerWidth - menuWidth - padding)
      );

      menu.style.top = `${Math.max(
        padding,
        Math.min(top, window.innerHeight - menuHeight - padding)
      )}px`;

      menu.style.left = `${left}px`;
    };

    updatePosition();

    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);

      if (menu.matches(':popover-open')) {
        menu.hidePopover();
      }
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: PointerEvent) => {
      const target = event.target as Node;

      if (!containerRef.current?.contains(target) && !menuRef.current?.contains(target)) {
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
          popover="manual"
          role="menu"
          className={cn(
            'bg-card absolute right-0 z-50',
            'border-border w-50 rounded-md border p-1.5 shadow-sm'
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
