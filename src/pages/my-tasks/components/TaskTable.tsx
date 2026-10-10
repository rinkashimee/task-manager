import Card from '@/components/ui/Cards/Card';
import Table from '@/components/ui/Table/Table';
import taskTableColumns from './TaskTableColumn';
import type { ConfirmationState, TaskTypes } from '../types/TaskTypes';
import { useState, type Dispatch, type SetStateAction } from 'react';
import { generateId } from '@/lib/utils/utils';
import ConfirmationModal from '@/components/ui/ConfirmationModal';
import type { HandleTypes } from '@/constants/commonContants';
import { useTranslation } from 'react-i18next';
import type { DropdownOption } from '@/components/ui/Dropdown/Dropdown.types';

interface TaskTableProps {
  total: number;
  pageSize: number;
  currentPage: number;
  isFetching: boolean;
  data: TaskTypes[];
  projectDropdown: DropdownOption[];
  setTaskData: Dispatch<SetStateAction<TaskTypes[]>>;
  handleEditTask: (data: TaskTypes) => void;
  setCurrentPage: (page: number) => void;
}

export default function TaskTable(props: TaskTableProps) {
  const {
    data,
    pageSize,
    currentPage,
    total,
    isFetching,
    projectDropdown,
    setTaskData,
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
        handleComplete(task.id);
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

  const handleComplete = (id: string) => {
    setTaskData((prev) =>
      prev.map((task) => (task.id === id ? { ...task, status: 'completed' } : task))
    );
  };

  const handleDuplicate = (task: TaskTypes) => {
    const originalTitle = task.title.replace(/(?: \(Copy\))+$/, '');
    const newTask: TaskTypes = {
      ...task,
      id: generateId(),
      title: `${originalTitle} (Copy)`,
    };
    setTaskData((prev) => [...prev, newTask]);
  };

  const handleDelete = (id: string) => {
    setTaskData((prev) => prev.filter((task) => task.id !== id));
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
