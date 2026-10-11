import Card from '@/components/ui/Cards/Card';
import Table from '@/components/ui/Table/Table';
import taskTableColumns from './TaskTableColumn';
import type {
  TaskConfirmationConfig,
  TaskConfirmationState,
  TaskFormValues,
  TaskTableProps,
  TaskTypes,
} from '../types/Task.types';
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

  const [confirmation, setConfirmation] = useState<TaskConfirmationState | null>(null);

  const confirmationConfig: Partial<Record<HandleTypes, TaskConfirmationConfig>> = {
    complete: {
      title: t('common.confirmation-config.complete', { name: t('my-tasks.name') }),
      description: t('common.confirmation-config.complete-desc', { name: t('my-tasks.name') }),
      variant: 'success',
      confirmText: t('common.confirmation-config.complete', { name: t('my-tasks.name') }),
    },
    delete: {
      title: t('common.confirmation-config.delete', { name: t('my-tasks.name') }),
      description: t('common.confirmation-config.delete-desc', { name: t('my-tasks.name') }),
      variant: 'danger',
      confirmText: t('common.confirmation-config.delete', { name: t('my-tasks.name') }),
    },
    duplicate: {
      title: t('common.confirmation-config.duplicate', { name: t('my-tasks.name') }),
      description: t('common.confirmation-config.duplicate-desc', { name: t('my-tasks.name') }),
      variant: 'default',
      confirmText: t('common.confirmation-config.duplicate', { name: t('my-tasks.name') }),
    },
  };

  const config = confirmation ? confirmationConfig[confirmation.handleType] : undefined;

  const taskConfirmationModal = (task: TaskTypes, handleType: HandleTypes) => {
    setConfirmation({ task, handleType });
  };

  const handleConfirm = () => {
    if (!confirmation) return;

    const { task, handleType } = confirmation;

    switch (handleType) {
      case 'complete':
        handleComplete(task);
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

  //TODO:
  const handleView = (task: TaskTypes) => {};

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
      t('common.complete-success', { name: t('my-tasks.name') })
    );
  };

  const handleDuplicate = async (task: TaskTypes) => {
    const { id, ...values } = task;

    const originalTitle = values.title.replace(/(?: \(Copy\))+$/, '');

    const newTask: TaskFormValues = {
      ...values,
      title: `${originalTitle} (Copy)`,
    };

    await createTask(newTask, t('common.duplicate-success', { name: t('my-tasks.name') }));
  };

  const handleDelete = async (id: string) => {
    await deleteTask(id);
  };

  return (
    <Card className="flex min-h-0 flex-1 flex-col p-3">
      <Table
        tableWrapperClassName="min-h-0 flex-1"
        rowKey={(id) => id.id}
        columns={taskTableColumns({
          projectDropdown,
          onViewHandle: handleView,
          onEditHandle: handleEdit,
          taskConfirmationModal,
        })}
        data={data}
        isLoading={isFetching}
        skeletonRows={15}
        emptyTitle={t('common.no-tasks')}
        emptyDesc={t('common.task-caption')}
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
        title={config?.title ?? ''}
        description={config?.description ?? ''}
        variant={config?.variant ?? 'default'}
        confirmText={config?.confirmText ?? 'Confirm'}
      />
    </Card>
  );
}
