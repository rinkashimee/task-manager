import type { TableColumn } from '@/components/ui/Table/Table';
import type { TaskTypes } from '../types/TaskTypes';
import { useTranslation } from 'react-i18next';
import Typography from '@/components/ui/Typography/Typography';
import Badge from '@/components/ui/Badge/Badge';
import { statusOptions } from '@/constants/statusOptions';
import { priorityVariants, statusVariants } from '../constant/TaskContants';
import { priorityOptions } from '@/constants/priorityOptions';
import TaskActionMenu from './TaskActionMenu';
import type { HandleTypes } from '@/constants/commonContants';

interface TableColumnProps {
  confirmationModal: (task: TaskTypes, handleType: HandleTypes) => void;
}

export default function taskTableColumns(props: TableColumnProps): TableColumn<TaskTypes>[] {
  const { confirmationModal } = props;

  const { t } = useTranslation();

  return [
    {
      key: 'task',
      title: t('my-tasks.table.task'),
      width: 450,
      dataIndex: 'title',
      render: (_, response) => (
        <div className="flex flex-col">
          <Typography variant="caption" className="font-sans font-semibold">
            {response.title}
          </Typography>

          <Typography variant="caption" className="text-text-muted font-sans">
            {response.description}
          </Typography>
        </div>
      ),
    },
    {
      key: 'project',
      title: t('my-tasks.table.project'),
      dataIndex: 'project',
      render: (_, response) => (
        /**TODO: */
        <Typography variant="caption" className="text-text font-sans">
          {response.project}
        </Typography>
      ),
    },
    {
      key: 'priority',
      title: t('my-tasks.table.priority'),
      dataIndex: 'priority',
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
      render: (_, reponse) => (
        <Typography variant="caption" className="text-text font-sans">
          {reponse.dueDate}
        </Typography>
      ),
    },
    {
      key: 'action',
      title: '',
      render: (_, response) => (
        <TaskActionMenu
          isCompleted={response.status === 'completed'}
          onComplete={() => confirmationModal(response, 'complete')}
          onEdit={() => confirmationModal(response, 'edit')}
          onDuplicate={() => confirmationModal(response, 'duplicate')}
          onDelete={() => confirmationModal(response, 'delete')}
        />
      ),
    },
  ];
}
