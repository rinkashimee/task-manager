import TaskIcon from '@/components/icons/TaskIcon';
import Typography from '../Typography/Typography';
import { useTranslation } from 'react-i18next';

export default function TableEmptyState() {
  const { t } = useTranslation();

  return (
    <div className="absolute inset-x-0 top-[41px] bottom-0 flex items-center justify-center">
      <div className="flex flex-col items-center text-center">
        <div className="bg-primary/10 mb-3 flex size-12 items-center justify-center rounded-full">
          <TaskIcon icon="ClipboardTextIcon" size={24} className="text-primary" />
        </div>

        <Typography as="p" variant="body-sm" className="text-text font-semibold">
          {t('common.no-tasks')}
        </Typography>

        <Typography as="p" variant="caption" className="text-text-muted mt-1">
          {t('common.task-caption')}
        </Typography>
      </div>
    </div>
  );
}
