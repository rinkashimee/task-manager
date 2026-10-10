import TaskIcon from '@/components/icons/TaskIcon';
import Header from '@/components/layouts/header/Header';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import Typography from '@/components/ui/Typography/Typography';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import TaskFilter from './components/TaskFilter';
import TaskTable from './components/TaskTable';
import type { FilterType, TaskFormMode, TaskFormValues, TaskTypes } from './types/TaskTypes';
import Modal from '@/components/ui/Modal/Modal';
import TaskForm from './components/TaskForm';
import { useTasks } from './hooks/useTasks';
import { useToast } from '@/components/ui/Toast/ToastProvider';

export default function MyTasks() {
  const { t } = useTranslation();
  const { showToast } = useToast();

  const pageSize = 50;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<FilterType>('all');

  const [taskForm, setTaskForm] = useState<{
    mode: TaskFormMode;
    task?: TaskTypes;
  } | null>(null);

  const {
    taskData,
    isFetching,
    isCreating,
    isUpdating,
    totalItems,
    projectDropdown,
    createTask,
    updateTask,
    getTaskById,
    deleteTask,
  } = useTasks({
    currentPage,
    pageSize,
    search,
    filter,
  });

  const isSubmitting = isCreating || isUpdating;

  const handleAddTask = () => {
    setTaskForm({ mode: 'create' });
  };

  const handleEditTask = async (task: TaskTypes) => {
    const latestTask = await getTaskById(task.id);

    if (!latestTask) {
      showToast({
        title: t('common.toast-title.fail'),
        description: t('common.not-found'),
        variant: 'error',
      });

      return;
    }

    setTaskForm({ mode: 'edit', task: latestTask });
  };

  const handleTaskSubmit = async (values: TaskFormValues) => {
    if (!taskForm) return;

    const success =
      taskForm.mode === 'edit' && taskForm.task
        ? await updateTask(taskForm.task.id, values)
        : await createTask(values);

    if (success) {
      setTaskForm(null);
    }
  };

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleFilter = (value: FilterType) => {
    setFilter(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <Header title={t('my-tasks.title')} caption={t('my-tasks.caption')} />

      <div className="flex shrink-0 items-center justify-between gap-6 p-6">
        <Input
          type="text"
          value={search}
          placeholder={t('common.search-tasks')}
          icon="MagnifyingGlassIcon"
          onChange={(e) => handleSearch(e.target.value)}
          wrapperClassName="w-full max-w-[400px]"
        />

        <Button
          type="button"
          variant="primary"
          className="h-9 gap-2 px-4 font-sans"
          onClick={() => handleAddTask()}
        >
          <TaskIcon size={16} icon="PlusIcon" />

          <Typography as="p" variant="caption" className="truncate">
            {t('common.add-tasks')}
          </Typography>
        </Button>
      </div>

      <div className="mb-6 flex min-h-0 flex-1 flex-col gap-4 px-6">
        <TaskFilter value={filter} onChange={handleFilter} />

        <TaskTable
          isFetching={isFetching}
          pageSize={pageSize}
          total={totalItems}
          projectDropdown={projectDropdown}
          currentPage={currentPage}
          setCurrentPage={handlePageChange}
          data={taskData}
          handleEditTask={handleEditTask}
          deleteTask={deleteTask}
          createTask={createTask}
          updateTask={updateTask}
        />
      </div>

      {taskForm && (
        <Modal
          open={taskForm !== null}
          onClose={() => {
            if (!isSubmitting) {
              setTaskForm(null);
            }
          }}
          title={
            taskForm?.mode === 'edit'
              ? t('my-tasks.modal.edit-tasks')
              : t('my-tasks.modal.add-tasks')
          }
          caption={
            taskForm?.mode === 'edit'
              ? t('my-tasks.modal.edit-caption')
              : t('my-tasks.modal.add-caption')
          }
          size="md"
        >
          <TaskForm
            mode={taskForm.mode}
            projectDropdown={projectDropdown}
            initialValues={taskForm.task}
            handleSubmit={handleTaskSubmit}
            onClose={() => {
              if (!isSubmitting) setTaskForm(null);
            }}
            isSubmitting={isSubmitting}
          />
        </Modal>
      )}
    </div>
  );
}
