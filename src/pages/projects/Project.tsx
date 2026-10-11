import TaskIcon from '@/components/icons/TaskIcon';
import Header from '@/components/layouts/header/Header';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import Typography from '@/components/ui/Typography/Typography';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ProjectTable from './components/ProjectTable';
import Modal from '@/components/ui/Modal/Modal';
import ProjectForm from './components/ProjectForm';
import type { ProjectFormMode, ProjectFormValues, ProjectTypes } from './types/Project.types';
import { useProject } from './hooks/useProject';
import { PAGE_SIZE } from '@/constants/commonContants';
import { useToast } from '@/components/ui/Toast/ToastProvider';

export default function Project() {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const pageSize = PAGE_SIZE;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');

  const [projectForm, setProjectForm] = useState<{
    mode: ProjectFormMode;
    project?: ProjectTypes;
  } | null>(null);

  const {
    projectData,
    isFetching,
    isCreating,
    isUpdating,
    isDeleting,
    totalItems,
    createProject,
    updateProject,
    getProjectById,
    deleteProject,
  } = useProject({
    currentPage,
    pageSize,
    search,
  });

  const isSubmitting = isCreating || isUpdating;

  const isConfirmation = isCreating || isUpdating || isDeleting;

  const handleAddProject = () => {
    setProjectForm({ mode: 'create' });
  };

  const handleEditProject = async (project: ProjectTypes) => {
    const latestTask = await getProjectById(project.id);

    if (!latestTask) {
      showToast({
        title: t('common.toast-title.fail'),
        description: t('common.not-found'),
        variant: 'error',
      });

      return;
    }

    setProjectForm({ mode: 'edit', project: latestTask });
  };

  const handleProjectSubmit = async (values: ProjectFormValues) => {
    if (!projectForm) return;

    const success =
      projectForm.mode === 'edit' && projectForm.project
        ? await updateProject(projectForm.project.id, values)
        : await createProject(values);

    if (success) {
      setProjectForm(null);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <Header title={t('project.title')} caption={t('project.caption')} />
      <div className="flex shrink-0 items-center justify-between gap-6 p-6">
        <Input
          type="text"
          value={search}
          placeholder={t('common.search-projects')}
          icon="MagnifyingGlassIcon"
          onChange={(e) => handleSearch(e.target.value)}
          wrapperClassName="w-full max-w-[400px]"
        />

        <Button
          type="button"
          variant="primary"
          className="h-9 gap-2 px-4 font-sans"
          onClick={() => handleAddProject()}
        >
          <TaskIcon size={16} icon="PlusIcon" />

          <Typography as="p" variant="caption" className="truncate">
            {t('common.new-project')}
          </Typography>
        </Button>
      </div>
      <div className="mb-6 flex min-h-0 flex-1 flex-col gap-4 px-6">
        <ProjectTable
          data={projectData}
          isFetching={isFetching}
          pageSize={pageSize}
          total={totalItems}
          currentPage={currentPage}
          isConfirmation={isConfirmation}
          setCurrentPage={handlePageChange}
          handleEditTask={handleEditProject}
          createTask={createProject}
          updateProject={updateProject}
          deleteProject={deleteProject}
        />
      </div>

      {projectForm && (
        <Modal
          open={projectForm !== null}
          onClose={() => {
            if (!isSubmitting) {
              setProjectForm(null);
            }
          }}
          title={
            projectForm?.mode === 'edit'
              ? t('project.modal.edit-project')
              : t('project.modal.new-project')
          }
          caption={
            projectForm?.mode === 'edit'
              ? t('project.modal.edit-caption')
              : t('project.modal.new-caption')
          }
          size="md"
        >
          <ProjectForm
            mode={projectForm.mode}
            initialValues={projectForm.project}
            handleSubmit={handleProjectSubmit}
            onClose={() => {
              if (!isSubmitting) setProjectForm(null);
            }}
            isSubmitting={isSubmitting}
          />
        </Modal>
      )}
    </div>
  );
}
