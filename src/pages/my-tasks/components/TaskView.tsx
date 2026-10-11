import Button from '@/components/ui/Button/Button';
import Typography from '@/components/ui/Typography/Typography';
import type { TaskTypes } from '../types/Task.types';
import type { ReactNode } from 'react';
import { formatDate } from '@/lib/utils/utils';
import type { IconType } from '@/components/icons/TaskIcon';
import TaskIcon from '@/components/icons/TaskIcon';
import { priorityOptions } from '@/constants/priorityOptions';
import { useTranslation } from 'react-i18next';
import { statusOptions } from '@/constants/statusOptions';
import type { DropdownOption } from '@/components/ui/Dropdown/Dropdown.types';

interface TaskViewProps {
  task: TaskTypes;
  projectDropdown: DropdownOption[];
  onEdit: () => void;
}

interface TaskDetailProps {
  icon: IconType;
  label: string;
  value: ReactNode;
}

interface TaskMetadataProps {
  label: string;
  value: ReactNode;
}

function TaskDetail({ icon, label, value }: TaskDetailProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <div className="bg-primary/10 flex size-9 shrink-0 items-center justify-center rounded-lg">
        <TaskIcon icon={icon} size={20} className="text-primary" />
      </div>

      <div className="flex min-w-0 flex-col gap-1">
        <Typography variant="caption" className="text-text-muted font-sans">
          {label}
        </Typography>

        <Typography variant="caption" className="text-text font-sans font-semibold break-words">
          {value}
        </Typography>
      </div>
    </div>
  );
}

function TaskMetadata({ label, value }: TaskMetadataProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <Typography variant="caption" className="text-text-muted font-sans">
        {label}
      </Typography>

      <Typography variant="caption" className="text-text font-sans font-medium break-words">
        {value}
      </Typography>
    </div>
  );
}

export default function TaskView(props: TaskViewProps) {
  const { task, projectDropdown, onEdit } = props;

  const { t } = useTranslation();

  const selectedPriority = priorityOptions.find((option) => option.value === task.priority);

  const selectedStatus = statusOptions.find((option) => option.value === task.status);

  const selectedProject = projectDropdown.find((option) => option.value === task.projectId);

  return (
    <div className="flex flex-col gap-5 px-5 pb-5">
      <div className="border-border border-t" />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <TaskDetail
          icon="FolderIcon"
          label={t('my-tasks.view.project')}
          value={selectedProject?.label}
        />

        <TaskDetail
          icon="CalendarDotsIcon"
          label={t('my-tasks.view.due-date')}
          value={formatDate(task.dueDate)}
        />

        <TaskDetail
          icon="FlagIcon"
          label={t('my-tasks.view.priority')}
          value={selectedPriority?.labels ? t(selectedPriority.labels) : task.priority}
        />
      </div>

      <div className="bg-background grid grid-cols-1 gap-4 rounded-lg p-4 sm:grid-cols-2">
        <TaskMetadata
          label={t('my-tasks.view.status')}
          value={selectedStatus?.labels ? t(selectedStatus.labels) : task.status}
        />

        <TaskMetadata
          label={t('my-tasks.view.last-updated')}
          value={formatDate(task.updatedAt, {
            includeTime: true,
          })}
        />

        <TaskMetadata
          label={t('my-tasks.view.created-at')}
          value={formatDate(task.createdAt, {
            includeTime: true,
          })}
        />

        <TaskMetadata label={t('my-tasks.view.task-id')} value={task.id} />
      </div>

      <div className="border-border flex flex-col gap-2 border-t pt-4">
        <Typography variant="body-sm" className="font-sans font-semibold">
          {t('my-tasks.view.description')}
        </Typography>

        <Typography variant="caption" className="text-text-muted font-sans whitespace-pre-wrap">
          {task.description || t('common.view-desc')}
        </Typography>
      </div>

      <div className="border-border flex justify-end border-t pt-4">
        <Button
          type="button"
          variant="primary"
          onClick={onEdit}
          className="h-9 gap-1 px-4 font-sans"
        >
          <TaskIcon icon="PencilSimpleIcon" size={14} />

          <Typography as="p" variant="caption" className="truncate">
            {t('common.edit', { name: t('my-tasks.name') })}
          </Typography>
        </Button>
      </div>
    </div>
  );
}
