import Card from '@/components/ui/Cards/Card';
import Table from '@/components/ui/Table/Table';
import taskTableColumns from './TaskTableColumn';
import type {
  ConfirmationState,
  TaskFormValues,
  TaskTableProps,
  TaskTypes,
} from '../types/TaskTypes';
import { useState } from 'react';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import type { HandleTypes } from '@/constants/commonContants';
import { useTranslation } from 'react-i18next';

export default function TaskTable(props: TaskTableProps) {
  const {
    data,
    pageSize,
    currentPage,
    total,
    isFetching,
    projectDropdown,
    createTask,
    updateTask,
    deleteTask,
    handleEditTask,
    setCurrentPage,
  } = props;

  const { t } = useTranslation();

  const [confirmation, setConfirmation] = useState<ConfirmationState | null>(null);

  const confirmationConfig = {
    complete: {
      title: t('common.confirmation-config.complete-task'),
      description: t('common.confirmation-config.complete-desc'),
      variant: 'success',
      confirmText: t('common.confirmation-config.complete-task'),
    },
    edit: {
      title: t('common.confirmation-config.edit-task'),
      description: t('common.confirmation-config.edit-desc'),
      variant: 'info',
      confirmText: t('common.confirmation-config.edit-task'),
    },
    delete: {
      title: t('common.confirmation-config.delete-task'),
      description: t('common.confirmation-config.delete-desc'),
      variant: 'danger',
      confirmText: t('common.confirmation-config.delete-task'),
    },
    duplicate: {
      title: t('common.confirmation-config.duplicate-task'),
      description: t('common.confirmation-config.duplicate-desc'),
      variant: 'info',
      confirmText: t('common.confirmation-config.duplicate-task'),
    },
  } as const;

  const confirmationModal = (task: TaskTypes, handleType: HandleTypes) => {
    setConfirmation({ task, handleType });
  };

  const handleConfirm = () => {
    if (!confirmation) return;

    const { task, handleType } = confirmation;

    switch (handleType) {
      case 'complete':
        handleComplete(task);
        break;

      case 'edit':
        handleEdit(task);
        break;

      case 'delete':
        handleDelete(task.id);
        break;

      case 'duplicate':
        handleDuplicate(task);
        break;
    }

    setConfirmation(null);
  };

  const handleEdit = (task: TaskTypes) => {
    handleEditTask(task);
  };

  const handleComplete = async (task: TaskTypes) => {
    const { id, ...values } = task;

    await updateTask(
      id,
      {
        ...values,
        status: 'completed',
      },
      t('common.complete-success')
    );
  };

  const handleDuplicate = async (task: TaskTypes) => {
    const { id, ...values } = task;

    const originalTitle = values.title.replace(/(?: \(Copy\))+$/, '');

    const newTask: TaskFormValues = {
      ...values,
      title: `${originalTitle} (Copy)`,
    };

    await createTask(newTask, t('common.duplicate-success'));
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
  };

  return (
    <Card className="flex min-h-0 flex-1 flex-col p-3">
      <Table
        tableWrapperClassName="min-h-0 flex-1"
        rowKey={(id) => id.id}
        columns={taskTableColumns({ projectDropdown, confirmationModal })}
        data={data}
        isLoading={isFetching}
        skeletonRows={15}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          resourceName: t('my-tasks.table.task'),
          onChange: setCurrentPage,
        }}
      />

      <ConfirmationModal
        open={confirmation !== null}
        onClose={() => setConfirmation(null)}
        onConfirm={handleConfirm}
        title={confirmation ? confirmationConfig[confirmation.handleType].title : ''}
        description={confirmation ? confirmationConfig[confirmation.handleType].description : ''}
        variant={confirmation ? confirmationConfig[confirmation.handleType].variant : 'info'}
        confirmText={
          confirmation ? confirmationConfig[confirmation.handleType].confirmText : 'Confirm'
        }
      />
    </Card>
  );
}
