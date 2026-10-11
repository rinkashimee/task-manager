import Button from '@/components/ui/Button/Button';
import Typography from '@/components/ui/Typography/Typography';
import { cn } from '@/lib/utils/utils';
import type { FilterType } from '../types/Task.types';
import type { ParseKeys } from 'i18next';
import { useTranslation } from 'react-i18next';

interface TaskFilterProps {
  value: FilterType;
  onChange: (value: FilterType) => void;
}

const filters: { label: ParseKeys; value: FilterType }[] = [
  { label: 'common.all', value: 'all' },
  { label: 'common.to-do', value: 'todo' },
  { label: 'common.in-progress', value: 'in-progress' },
  { label: 'common.completed', value: 'completed' },
  { label: 'common.overdue', value: 'overdue' },
];

export default function TaskFilter(props: TaskFilterProps) {
  const { value, onChange } = props;

  const { t } = useTranslation();

  return (
    <div className="flex items-center gap-4">
      {filters.map((filter) => {
        const isActive = value === filter.value;

        return (
          <Button
            key={filter.value}
            variant={isActive ? 'primary' : 'ghost'}
            onClick={() => onChange(filter.value)}
            className={cn('h-9 rounded-md px-4', !isActive && 'bg-canvas text-text-muted')}
          >
            <Typography as="p" variant="caption" className="truncate font-sans font-semibold">
              {t(filter.label)}
            </Typography>
          </Button>
        );
      })}
    </div>
  );
}
