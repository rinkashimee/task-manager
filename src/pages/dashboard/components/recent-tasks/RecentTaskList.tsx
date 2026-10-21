import { useTranslation } from 'react-i18next';
import ListItem from '@/components/ui/ListItem/ListItem';
import Badge from '@/components/ui/Badge/Badge';
import Typography from '@/components/ui/Typography/Typography';
import TaskIcon from '@/components/icons/TaskIcon';
import ActionMenu from '@/components/ui/Table/ActionMenu';
import type { TaskTypes } from '@/pages/my-tasks/types/Task.types';
import type { DropdownOption } from '@/components/ui/Dropdown/Dropdown.types';
import { statusOptions } from '@/constants/statusOptions';
import { priorityOptions } from '@/constants/priorityOptions';
import { priorityVariants, statusVariants } from '@/pages/my-tasks/constant/TaskConstant';
import { formatDate } from '@/lib/utils/utils';

interface RecentTaskListProps {
  data: TaskTypes[];
  projectDropdown: DropdownOption[];
  onViewHandle: (task: TaskTypes) => void;
}

export default function RecentTaskList(props: RecentTaskListProps) {
  const { data, projectDropdown, onViewHandle } = props;

  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3 py-3">
      {data.map((task) => {
        const selectedProject = projectDropdown.find((option) => option.value === task.projectId);

        const selectedPriority = priorityOptions.find((option) => option.value === task.priority);

        const selectedStatus = statusOptions.find((option) => option.value === task.status);

        return (
          <ListItem
            key={task.id}
            title={task.title}
            description={selectedProject?.label}
            actions={
              <ActionMenu
                viewOnly
                name={t('my-tasks.table.task')}
                onView={() => onViewHandle(task)}
                onEdit={() => {}}
                onDelete={() => {}}
                onComplete={() => {}}
                onDuplicate={() => {}}
              />
            }
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={priorityVariants[task.priority]}>
                {selectedPriority?.labels ? t(selectedPriority.labels) : task.priority}
              </Badge>

              <Badge variant={statusVariants[task.status]}>
                {selectedStatus?.labels ? t(selectedStatus.labels) : task.status}
              </Badge>
            </div>

            <div className="border-border mt-3 flex items-center gap-2 border-t pt-3">
              <TaskIcon icon="CalendarBlankIcon" size={14} className="text-text-muted" />

              <Typography variant="caption" className="text-text-muted font-sans">
                {formatDate(task.dueDate, { includeTime: false })}
              </Typography>
            </div>
          </ListItem>
        );
      })}
    </div>
  );
}
