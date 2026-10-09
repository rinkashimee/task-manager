import { useTranslation } from 'react-i18next';
import Typography from '../Typography/Typography';
import Button from '../Button/Button';
import TaskIcon from '@/components/icons/TaskIcon';

interface TablePaginationProps {
  current: number;
  pageSize: number;
  total: number;
  resourceName?: string;

  onChange?: (page: number) => void;
}

export default function TablePagination(props: TablePaginationProps) {
  const { current, pageSize, total, resourceName, onChange } = props;
  const { t } = useTranslation();

  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="flex items-center justify-between p-3">
      <Typography variant="caption" className="truncate">
        {t('common.pagination-showing', {
          count: `${(current - 1) * pageSize + 1}-${Math.min(current * pageSize, total)}`,
          total: `${total}`,
          resourceName: resourceName?.toLowerCase(),
        })}
      </Typography>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          disabled={current === 1}
          onClick={() => onChange?.(current - 1)}
          className="px-3 py-2"
        >
          <TaskIcon size={16} icon="CaretLeftIcon" />
        </Button>

        <Typography variant="caption" className="truncate">
          {current} / {totalPages}
        </Typography>

        <Button
          variant="ghost"
          disabled={current === totalPages}
          onClick={() => onChange?.(current + 1)}
          className="px-3 py-2"
        >
          <TaskIcon size={16} icon="CaretRightIcon" />
        </Button>
      </div>
    </div>
  );
}
