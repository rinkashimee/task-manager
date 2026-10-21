import type { TableColumn } from '@/components/ui/Table/Table';
import { useTranslation } from 'react-i18next';
import Typography from '@/components/ui/Typography/Typography';
import Badge from '@/components/ui/Badge/Badge';
import { statusOptions } from '@/constants/statusOptions';
import { priorityOptions } from '@/constants/priorityOptions';

import type { DropdownOption } from '@/components/ui/Dropdown/Dropdown.types';
import { formatDate } from '@/lib/utils/utils';
import ActionMenu from '@/components/ui/Table/ActionMenu';
import type { TaskTypes } from '@/pages/my-tasks/types/Task.types';
import { priorityVariants, statusVariants } from '@/pages/my-tasks/constant/TaskConstant';
import TaskIcon from '@/components/icons/TaskIcon';

interface RecentTaskColumnProps {
  projectDropdown: DropdownOption[];
  onViewHandle: (task: TaskTypes) => void;
}

export default function recentTaskColumns(props: RecentTaskColumnProps): TableColumn<TaskTypes>[] {
  const { projectDropdown, onViewHandle } = props;

  const { t } = useTranslation();

  return [
    {
      key: 'task',
      title: t('my-tasks.table.task'),
      dataIndex: 'title',
      skeletonWidth: 'w-48',
      render: (_, response) => {
        const selectedProject = projectDropdown.find(
          (option) => option.value === response.projectId
        );

        return (
          <div className="flex flex-col">
            <Typography variant="caption" className="text-text truncate font-sans font-semibold">
              {response.title}
            </Typography>

            <div className="flex items-center gap-1">
              <TaskIcon icon="FolderIcon" size={15} className="text-text-muted" />

              <Typography variant="caption" className="text-text-muted font-sans">
                {selectedProject?.label}
              </Typography>
            </div>
          </div>
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
          viewOnly
          name={t('my-tasks.table.task')}
          onView={() => onViewHandle(response)}
          onEdit={() => {}}
          onDelete={() => {}}
          onComplete={() => {}}
          onDuplicate={() => {}}
        />
      ),
    },
  ];
}
