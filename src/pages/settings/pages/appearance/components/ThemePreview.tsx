import Typography from '@/components/ui/Typography/Typography';
import { themes } from '../constants/Appearance.constant';
import TaskIcon from '@/components/icons/TaskIcon';
import type { ThemeOptionsType } from '../types/Appearance.types';
import { cn } from '@/lib/utils/utils';
import { useTranslation } from 'react-i18next';

interface ThemePreviewProps {
  seletedTheme: ThemeOptionsType['value'];
  setSelectedTheme: (theme: ThemeOptionsType['value']) => void;
}

export default function ThemePreview(props: ThemePreviewProps) {
  const { seletedTheme, setSelectedTheme } = props;

  const { t } = useTranslation();

  return (
    <div className="mt-5">
      <div className="flex flex-1 flex-col gap-1">
        <Typography variant="caption" className="text-text font-semibold">
          {t('settings.appearance.preview')}
        </Typography>

        <Typography variant="caption" className="text-text-muted">
          {t('settings.appearance.preview-desc')}
        </Typography>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {themes.map((item) => {
          const selected = seletedTheme === item.value;

          return (
            <button
              key={item.value}
              type="button"
              onClick={() => setSelectedTheme(item.value)}
              className={cn(
                'border-border overflow-hidden rounded-md border p-2 text-left transition-colors',
                seletedTheme === item.value && 'border-primary'
              )}
            >
              <div
                className={cn(
                  'flex h-32 items-center justify-center rounded-md',
                  item.value === 'light' ? 'bg-background text-text' : 'bg-[#0c1523] text-white'
                )}
              >
                <TaskIcon icon={item.icon} size={28} />
              </div>

              <Typography
                variant="caption"
                className={cn('mt-2 font-semibold', selected ? 'text-primary' : 'text-text')}
              >
                {t('common.theme-preview', { value: t(item.label) })}
                {selected ? t('common.current') : ''}
              </Typography>
            </button>
          );
        })}
      </div>
    </div>
  );
}
