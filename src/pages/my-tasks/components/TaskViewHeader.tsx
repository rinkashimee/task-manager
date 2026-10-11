import TaskIcon from '@/components/icons/TaskIcon';
import Badge from '@/components/ui/Badge/Badge';
import Typography from '@/components/ui/Typography/Typography';
import { priorityVariants, statusVariants } from '../constant/TaskConstant';
import type { TaskTypes } from '../types/Task.types';
import { priorityOptions } from '@/constants/priorityOptions';
import { useTranslation } from 'react-i18next';
import { statusOptions } from '@/constants/statusOptions';

interface TaskViewHeaderProps {
  viewTask: TaskTypes;
}

export default function TaskViewHeader(props: TaskViewHeaderProps) {
  const { viewTask } = props;

  const { t } = useTranslation();

  const selectedStatus = statusOptions.find((option) => option.value === viewTask.status);

  const selectedPriority = priorityOptions.find((option) => option.value === viewTask.priority);

  return (
    <div className="flex items-center gap-4">
      <div className="bg-primary/10 flex size-12 shrink-0 items-center justify-center rounded-xl">
        <TaskIcon icon="ListChecksIcon" size={24} className="text-primary" />
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <Typography as="h2" variant="body-lg" className="text-text font-sans font-semibold">
          {viewTask.title}
        </Typography>

        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={statusVariants[viewTask.status]}>
            {selectedStatus?.labels ? t(selectedStatus.labels) : viewTask.status}
          </Badge>

          <Badge variant={priorityVariants[viewTask.priority]}>
            {selectedPriority?.labels ? t(selectedPriority.labels) : viewTask.priority}
          </Badge>
        </div>
      </div>
    </div>
  );
}
