import type { TableColumn } from '@/components/ui/Table/Table';
import type { TaskTypes } from '../types/Task.types';
import { useTranslation } from 'react-i18next';
import Typography from '@/components/ui/Typography/Typography';
import Badge from '@/components/ui/Badge/Badge';
import { statusOptions } from '@/constants/statusOptions';
import { priorityVariants, statusVariants } from '../constant/TaskConstant';
import { priorityOptions } from '@/constants/priorityOptions';

import type { HandleTypes } from '@/constants/commonContants';
import type { DropdownOption } from '@/components/ui/Dropdown/Dropdown.types';
import { formatDate } from '@/lib/utils/utils';
import ActionMenu from '@/components/ui/Table/ActionMenu';

interface TaskTableColumnProps {
  projectDropdown: DropdownOption[];
  onViewHandle: (task: TaskTypes) => void;
  onEditHandle: (task: TaskTypes) => void;
  taskConfirmationModal: (task: TaskTypes, handleType: HandleTypes) => void;
}

export default function taskTableColumns(props: TaskTableColumnProps): TableColumn<TaskTypes>[] {
  const { projectDropdown, onViewHandle, onEditHandle, taskConfirmationModal } = props;

  const { t } = useTranslation();

  return [
    {
      key: 'task',
      title: t('my-tasks.table.task'),
      width: 450,
      dataIndex: 'title',
      skeletonWidth: 'w-48',
      render: (_, response) => (
        <div className="flex flex-col">
          <Typography variant="caption" className="truncate font-sans font-semibold">
            {response.title}
          </Typography>

          <Typography variant="caption" className="text-text-muted truncate font-sans">
            {response.description}
          </Typography>
        </div>
      ),
    },
    {
      key: 'projectId',
      title: t('my-tasks.table.project'),
      dataIndex: 'projectId',
      skeletonWidth: 'w-28',
      render: (_, response) => {
        const selectedProject = projectDropdown.find(
          (option) => option.value === response.projectId
        );

        return (
          <Typography variant="caption" className="text-text font-sans">
            {selectedProject?.label}
          </Typography>
        );
      },
    },
    {
      key: 'priority',
      title: t('my-tasks.table.priority'),
      dataIndex: 'priority',
      skeletonWidth: 'w-24',
      render: (_, response) => {
        const selectedPriority = priorityOptions.find(
          (option) => option.value === response.priority
        );

        return (
          <Badge variant={priorityVariants[response.priority]}>
            {selectedPriority?.labels ? t(selectedPriority.labels) : response.priority}
          </Badge>
        );
      },
    },
    {
      key: 'status',
      title: t('my-tasks.table.status'),
      dataIndex: 'status',
      skeletonWidth: 'w-24',
      render: (_, response) => {
        const selectedStatus = statusOptions.find((option) => option.value === response.status);

        return (
          <Badge variant={statusVariants[response.status]}>
            {selectedStatus?.labels ? t(selectedStatus.labels) : response.status}
          </Badge>
        );
      },
    },
    {
      key: 'dueDate',
      title: t('my-tasks.table.due-date'),
      dataIndex: 'dueDate',
      skeletonWidth: 'w-28',
      render: (_, reponse) => (
        <Typography variant="caption" className="text-text font-sans">
          {formatDate(reponse.dueDate, { includeTime: false })}
        </Typography>
      ),
    },
    {
      key: 'action',
      title: '',
      skeletonWidth: 'w-6',
      render: (_, response) => (
        <ActionMenu
          name={t('my-tasks.table.task')}
          isCompleted={response.status === 'completed'}
          onComplete={() => taskConfirmationModal(response, 'complete')}
          onEdit={() => onEditHandle(response)}
          onView={() => onViewHandle(response)}
          onDuplicate={() => taskConfirmationModal(response, 'duplicate')}
          onDelete={() => taskConfirmationModal(response, 'delete')}
        />
      ),
    },
  ];
}
