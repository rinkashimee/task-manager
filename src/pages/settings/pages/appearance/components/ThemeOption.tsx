import TaskIcon from '@/components/icons/TaskIcon';
import Button from '@/components/ui/Button/Button';
import Typography from '@/components/ui/Typography/Typography';
import { cn } from '@/lib/utils/utils';
import { useTranslation } from 'react-i18next';
import type { ThemeOptionsType } from '../types/Appearance.types';

interface ThemeOptionProps {
  item: ThemeOptionsType;
  seletedTheme: ThemeOptionsType['value'];
  setSelectedTheme: (theme: ThemeOptionsType['value']) => void;
}

export default function ThemeOption(props: ThemeOptionProps) {
  const { item, seletedTheme, setSelectedTheme } = props;

  const { t } = useTranslation();

  const selected = seletedTheme === item.value;

  return (
    <Button
      type="button"
      variant="ghost"
      aria-pressed={selected}
      onClick={() => setSelectedTheme(item.value)}
      className={cn(
        'flex items-center gap-3 rounded-md border p-3 text-left transition-colors',
        selected
          ? 'border-primary bg-primary/5'
          : 'border-border hover:bg-primary/5 hover:border-primary'
      )}
    >
      <TaskIcon
        icon={item.icon}
        size={22}
        className={selected ? 'text-primary' : 'text-text-muted'}
      />

      <div className="flex flex-1 flex-col gap-1">
        <Typography
          variant="caption"
          className={cn('font-semibold', selected ? 'text-primary' : 'text-text')}
        >
          {t(item.label)}
        </Typography>

        <Typography variant="caption" className="text-text-muted">
          {t(item.description)}
        </Typography>
      </div>

      <span
        className={cn(
          'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border',
          selected ? 'border-primary bg-primary' : 'border-border'
        )}
      >
        {selected && <span className="bg-card h-1.5 w-1.5 rounded-full" />}
      </span>
    </Button>
  );
}
