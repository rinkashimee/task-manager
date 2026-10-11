import Card from '@/components/ui/Cards/Card';
import Table from '@/components/ui/Table/Table';
import projectTableColumns from './ProjectTableColumn';
import type {
  ProjectConfirmationConfig,
  ProjectConfirmationState,
  ProjectFormValues,
  ProjectTableProps,
  ProjectTypes,
} from '../types/Project.types';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import type { HandleTypes } from '@/constants/commonContants';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

export default function ProjectTable(props: ProjectTableProps) {
  const {
    data,
    total,
    pageSize,
    currentPage,
    isFetching,
    isConfirmation,
    createTask,
    updateProject,
    deleteProject,
    handleEditTask,
    setCurrentPage,
  } = props;

  const { t } = useTranslation();

  const [confirmation, setConfirmation] = useState<ProjectConfirmationState | null>(null);

  const confirmationConfig: Partial<Record<HandleTypes, ProjectConfirmationConfig>> = {
    complete: {
      title: t('common.confirmation-config.complete', { name: t('project.name') }),
      description: t('common.confirmation-config.complete-desc', { name: t('project.name') }),
      variant: 'success',
      confirmText: t('common.confirmation-config.complete', { name: t('project.name') }),
    },
    delete: {
      title: t('common.confirmation-config.delete', { name: t('project.name') }),
      description: t('common.confirmation-config.delete-desc', { name: t('project.name') }),
      variant: 'danger',
      confirmText: t('common.confirmation-config.delete', { name: t('project.name') }),
    },
    duplicate: {
      title: t('common.confirmation-config.duplicate', { name: t('project.name') }),
      description: t('common.confirmation-config.duplicate-desc', { name: t('project.name') }),
      variant: 'default',
      confirmText: t('common.confirmation-config.duplicate', { name: t('project.name') }),
    },
  };

  const config = confirmation ? confirmationConfig[confirmation.handleType] : undefined;

  const projectConfirmationModal = (task: ProjectTypes, handleType: HandleTypes) => {
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
  const handleView = (project: ProjectTypes) => {};

  const handleEdit = (project: ProjectTypes) => {
    handleEditTask(project);
  };

  const handleComplete = async (project: ProjectTypes) => {
    const { id, ...values } = project;

    await updateProject(
      id,
      {
        ...values,
        status: 'completed',
      },
      t('common.complete-success', { name: t('project.name') })
    );
  };

  const handleDuplicate = async (project: ProjectTypes) => {
    const { id, ...values } = project;

    const originalTitle = values.name.replace(/(?: \(Copy\))+$/, '');

    const newTask: ProjectFormValues = {
      ...values,
      name: `${originalTitle} (Copy)`,
    };

    await createTask(newTask, t('common.duplicate-success', { name: t('project.name') }));
  };

  const handleDelete = async (id: string) => {
    await deleteProject(id);
  };

  return (
    <Card className="flex min-h-0 flex-1 flex-col p-3">
      <Table
        tableWrapperClassName="min-h-0 flex-1"
        rowKey={(id) => id.id}
        columns={projectTableColumns({
          onViewHandle: handleView,
          onEditHandle: handleEdit,
          projectConfirmationModal,
        })}
        data={data}
        isLoading={isFetching}
        skeletonRows={15}
        emptyTitle={t('common.no-projects')}
        emptyDesc={t('common.project-caption')}
        emptyIcon="FolderOpenIcon"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: total,
          resourceName: t('project.title'),
          onChange: setCurrentPage,
        }}
      />

      <ConfirmationModal
        open={confirmation !== null}
        loading={isConfirmation}
        onClose={() => {
          if (!isConfirmation) {
            setConfirmation(null);
          }
        }}
        onConfirm={handleConfirm}
        title={config?.title ?? ''}
        description={config?.description ?? ''}
        variant={config?.variant ?? 'default'}
        confirmText={config?.confirmText ?? 'Confirm'}
      />
    </Card>
  );
}
