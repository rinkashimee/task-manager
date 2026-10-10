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

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const start = total === 0 ? 0 : (current - 1) * pageSize + 1;

  const end = Math.min(current * pageSize, total);

  const isFirstPage = current <= 1;
  const isLastPage = current >= totalPages;

  return (
    <div className="flex items-center justify-between p-3">
      <Typography variant="caption" className="truncate">
        {t('common.pagination-showing', {
          count: `${start}-${end}`,
          total: `${total}`,
          resourceName: resourceName?.toLowerCase(),
        })}
      </Typography>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          disabled={isFirstPage}
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
          disabled={isLastPage}
          onClick={() => onChange?.(current + 1)}
          className="px-3 py-2"
        >
          <TaskIcon size={16} icon="CaretRightIcon" />
        </Button>
      </div>
    </div>
  );
}
