import { useTranslation } from 'react-i18next';
import ListItem from '@/components/ui/ListItem/ListItem';
import Typography from '@/components/ui/Typography/Typography';
import Badge from '@/components/ui/Badge/Badge';
import TaskIcon from '@/components/icons/TaskIcon';
import { formatDate } from '@/lib/utils/utils';
import type { TaskTypes } from '../types/Task.types';
import type { DropdownOption } from '@/components/ui/Dropdown/Dropdown.types';
import { priorityOptions } from '@/constants/priorityOptions';
import { statusOptions } from '@/constants/statusOptions';
import ActionMenu from '@/components/ui/Table/ActionMenu';
import { priorityVariants, statusVariants } from '../constant/TaskConstant';

interface TaskListProps {
  data: TaskTypes[];
  projectDropdown: DropdownOption[];
  isProjectTaskLists?: boolean;
  onViewHandle: (task: TaskTypes) => void;
  onEditHandle: (task: TaskTypes) => void;
  taskConfirmationModal: (task: TaskTypes, type: 'complete' | 'duplicate' | 'delete') => void;
}

export default function TaskList(props: TaskListProps) {
  const {
    data,
    projectDropdown,
    isProjectTaskLists,
    onViewHandle,
    onEditHandle,
    taskConfirmationModal,
  } = props;

  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3">
      {data.map((task) => {
        const selectedProject = projectDropdown.find((option) => option.value === task.projectId);

        const selectedPriority = priorityOptions.find((option) => option.value === task.priority);

        const selectedStatus = statusOptions.find((option) => option.value === task.status);

        return (
          <ListItem
            key={task.id}
            title={task.title}
            description={task.description}
            actions={
              <ActionMenu
                name={t('my-tasks.table.task')}
                isCompleted={task.status === 'completed'}
                onComplete={() => taskConfirmationModal(task, 'complete')}
                onEdit={() => onEditHandle(task)}
                onView={() => onViewHandle(task)}
                onDuplicate={() => taskConfirmationModal(task, 'duplicate')}
                onDelete={() => taskConfirmationModal(task, 'delete')}
              />
            }
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={statusVariants[task.status]}>
                {selectedStatus?.labels ? t(selectedStatus.labels) : task.status}
              </Badge>

              <Badge variant={priorityVariants[task.priority]}>
                {selectedPriority?.labels ? t(selectedPriority.labels) : task.priority}
              </Badge>
            </div>

            <div className="border-border mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3">
              {!isProjectTaskLists && (
                <div className="flex min-w-0 items-center gap-2">
                  <TaskIcon icon="FolderIcon" size={14} className="text-text-muted shrink-0" />

                  <Typography variant="caption" className="text-text-muted truncate font-sans">
                    {selectedProject?.label ?? '—'}
                  </Typography>
                </div>
              )}

              <div className="flex items-center gap-2">
                <TaskIcon icon="CalendarBlankIcon" size={14} className="text-text-muted" />

                <Typography variant="caption" className="text-text-muted font-sans">
                  {formatDate(task.dueDate, { includeTime: false })}
                </Typography>
              </div>
            </div>
          </ListItem>
        );
      })}
    </div>
  );
}
