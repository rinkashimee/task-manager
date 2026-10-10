import { useEffect, useRef, useState } from 'react';
import type { DropdownProps } from './Dropdown.types';
import { cn } from '@/lib/utils/utils';
import Input from '../Input/Input';
import Button from '../Button/Button';
import TaskIcon from '@/components/icons/TaskIcon';
import Typography from '../Typography/Typography';
import { useTranslation } from 'react-i18next';

export default function Dropdown(props: DropdownProps) {
  const {
    name,
    id,
    value,
    icon = 'UserCircleIcon',
    defaultValue = '',
    placeholder,
    options,
    onChange,
    hideIcon = false,
    error = false,
    disabled = false,
    className,
  } = props;
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedValue = value !== undefined ? value : internalValue;

  const selectedOption = options.find((option) => option.value === selectedValue);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: PointerEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handleClickOutside, true);

    return () => {
      document.removeEventListener('pointerdown', handleClickOutside, true);
    };
  }, [isOpen]);

  const handleSelect = (selected: string) => {
    if (value === undefined) {
      setInternalValue(selected);
    }

    onChange?.(selected);
    setIsOpen(false);
  };

  return (
    <div ref={dropdownRef} className={cn('relative w-full', className)}>
      <Input type="hidden" name={name} value={selectedValue} hideIcon />

      <Button
        id={id}
        variant="ghost"
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((previous) => !previous)}
        className={cn(
          'border-border bg-card flex h-10 w-full items-center justify-between gap-2 rounded-md border px-3',
          'font-sans text-xs transition-colors',
          'focus:border-primary outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-danger focus-visible:border-danger'
        )}
      >
        <div className="flex min-w-0 items-center gap-1">
          {!hideIcon &&
            (selectedOption?.icon ?? (
              <TaskIcon icon={icon} size={16} className="text-text-muted" />
            ))}

          <span className={cn('truncate', selectedOption ? 'text-text' : 'text-text-muted')}>
            {(selectedOption?.label || (selectedOption?.labels && t(selectedOption?.labels))) ??
              placeholder}
          </span>
        </div>

        <TaskIcon
          icon="CaretDownIcon"
          size={16}
          className={cn('text-text-muted shrink-0 transition-transform', isOpen && 'rotate-180')}
        />
      </Button>

      {isOpen && (
        <div
          role="listbox"
          className="border-border bg-card absolute top-full right-0 left-0 z-50 mt-1 max-h-50 space-y-1 overflow-y-auto rounded-md border p-1 shadow-md"
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={selectedValue === option.value}
              disabled={option.disabled}
              onClick={() => handleSelect(option.value)}
              className={cn(
                'flex w-full items-center gap-1 rounded-md px-3 py-2',
                'text-text text-left font-sans text-xs',
                'hover:bg-primary/10',
                'disabled:cursor-not-allowed disabled:opacity-50',
                selectedValue === option.value && 'bg-primary/10 text-primary'
              )}
            >
              {option.icon}

              <Typography as="span" variant="caption" className="flex-1 truncate">
                {option.label ?? (option.labels && t(option.labels))}
              </Typography>

              {selectedValue === option.value && <TaskIcon icon="CheckIcon" size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
