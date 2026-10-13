import TaskIcon from '@/components/icons/TaskIcon';
import Badge from '@/components/ui/Badge/Badge';
import type { DropdownOption } from '@/components/ui/Dropdown/Dropdown.types';
import ActionMenu from '@/components/ui/Table/ActionMenu';
import Typography from '@/components/ui/Typography/Typography';
import { priorityOptions } from '@/constants/priorityOptions';
import { cn } from '@/lib/utils/utils';
import { priorityVariants } from '@/pages/my-tasks/constant/TaskConstant';
import type { TaskTypes } from '@/pages/my-tasks/types/Task.types';
import { useTranslation } from 'react-i18next';

interface UpcomingDeadlineItemProps {
  task: TaskTypes;
  projectDropdown: DropdownOption[];
  handView: () => void;
}

export default function UpcomingDeadlineItem(props: UpcomingDeadlineItemProps) {
  const { task, projectDropdown, handView } = props;

  const { t } = useTranslation();

  const date = new Date(`${task.dueDate}T00:00:00`);

  const month = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
  const day = date.getDate();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysRemaining = Math.round((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const isNearDeadline = daysRemaining >= 0 && daysRemaining <= 2;

  const selectedProject = projectDropdown.find((option) => option.value === task.projectId);
  const selectedPriority = priorityOptions.find((option) => option.value === task.priority);

  return (
    <div
      className={cn(
        'border-border grid h-15 items-center gap-3',
        'grid-cols-[minmax(0,1fr)_minmax(0,1fr)_32px]',
        'border-b px-2 last:border-b-0'
      )}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div
          className={cn(
            'flex size-11 shrink-0 flex-col items-center justify-center rounded-lg',
            isNearDeadline ? 'bg-danger/10' : 'bg-primary/10'
          )}
        >
          <Typography
            variant="caption"
            className={cn(
              'text-[10px] !font-bold uppercase',
              isNearDeadline ? 'text-danger' : 'text-primary'
            )}
          >
            {month}
          </Typography>

          <Typography
            variant="body-sm"
            className={cn('!font-bold', isNearDeadline ? 'text-danger' : 'text-primary')}
          >
            {day}
          </Typography>
        </div>

        <div className="flex w-40 min-w-0 flex-col gap-1">
          <Typography variant="caption" className="truncate font-semibold">
            {task.title}
          </Typography>

          <div className="flex items-center gap-1">
            <TaskIcon icon="FolderIcon" size={15} className="text-text-muted" />

            <Typography variant="caption" className="text-text-muted truncate">
              {selectedProject?.label}
            </Typography>
          </div>
        </div>
      </div>

      <div className="flex shrink-0 items-center justify-center">
        <Badge variant={priorityVariants[task.priority]}>
          {selectedPriority?.labels ? t(selectedPriority.labels) : task.priority}
        </Badge>
      </div>

      <div className="flex shrink-0 items-center justify-center">
        <ActionMenu
          viewOnly
          name={t('my-tasks.table.task')}
          onView={() => handView()}
          onComplete={() => {}}
          onEdit={() => {}}
          onDuplicate={() => {}}
          onDelete={() => {}}
        />
      </div>
    </div>
  );
}
