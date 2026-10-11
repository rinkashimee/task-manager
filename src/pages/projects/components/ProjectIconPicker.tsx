import TaskIcon from '@/components/icons/TaskIcon';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import { cn } from '@/lib/utils/utils';
import { useState } from 'react';
import { projectIcons, type ProjectIconType } from '../constant/ProjectConstant';

interface ProjectIconPickerProps {
  name?: string;
  value?: ProjectIconType;
  defaultValue?: string;
  onChange?: (value: ProjectIconType) => void;
  disabled?: boolean;
}

export default function ProjectIconPicker(props: ProjectIconPickerProps) {
  const { value, name, defaultValue = '', disabled, onChange } = props;

  const [internalValue, setInternalValue] = useState(defaultValue);

  const selectedValue = value !== undefined ? value : internalValue;

  const handleSelect = (selected: ProjectIconType) => {
    if (value === undefined) {
      setInternalValue(selected);
    }

    onChange?.(selected);
  };

  return (
    <div>
      <Input type="hidden" name={name} value={selectedValue} hideIcon />

      <div className="flex flex-wrap items-center gap-3">
        {projectIcons.map((item) => {
          const isSelected = selectedValue === item.value;

          return (
            <Button
              key={item.value}
              type="button"
              variant="ghost"
              disabled={disabled}
              onClick={() => handleSelect(item.value)}
              aria-label={`Select ${item.value} icon`}
              aria-pressed={isSelected}
              className={cn(
                'flex size-10 items-center justify-center rounded-md border',
                'transition-colors',
                item.color,
                isSelected
                  ? 'border-primary ring-primary/20 ring-2'
                  : 'border-transparent hover:opacity-80',
                'disabled:cursor-not-allowed disabled:opacity-50'
              )}
            >
              <TaskIcon icon={item.icon} size={18} weight="bold" />
            </Button>
          );
        })}
      </div>
    </div>
  );
}
