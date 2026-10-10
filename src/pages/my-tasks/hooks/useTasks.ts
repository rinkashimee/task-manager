import { useToast } from '@/components/ui/Toast/ToastProvider';
import { useCallback, useEffect, useState } from 'react';
import type {
  TaskLoadingState,
  TaskQueryParams,
  TaskRequest,
  TaskTypes,
  UseTasksParams,
} from '../types/TaskTypes';
import { taskApi } from '../service/taskApi';
import { useTranslation } from 'react-i18next';
import { getApiErrorMessage } from '@/api/apiError';
import type { DropdownOption } from '@/components/ui/Dropdown/Dropdown.types';

export function useTasks(props: UseTasksParams) {
  const { currentPage, pageSize, search, filter } = props;

  const { t } = useTranslation();
  const { showToast } = useToast();

  const [taskData, setTaskData] = useState<TaskTypes[]>([]);
  const [projectDropdown, setProjectDropdown] = useState<DropdownOption[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState<TaskLoadingState>({
    fetch: true,
    fetchTask: false,
    create: false,
    update: false,
    delete: false,
  });

  // GET PROJECT DROPDOWN
  const fetchProjectDropdown = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, fetch: true }));

      const response = await taskApi.getProjectDropdown();

      const options: DropdownOption[] = response.map((project) => ({
        label: project.name,
        value: project.id,
      }));

      setProjectDropdown(options);
    } catch (error) {
      const message = getApiErrorMessage(error, t);

      showToast({
        title: t('common.toast-title.fail'),
        description: message,
        variant: 'error',
      });
    } finally {
      setLoading((prev) => ({ ...prev, fetch: false }));
    }
  }, [showToast, t]);

  // GET ALL TASKS
  const fetchTasks = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, fetch: true }));

      const params: TaskQueryParams = {
        page: currentPage - 1,
        size: pageSize,
        search: search.trim(),
        status: filter,
      };

      const response = await taskApi.getAll(params);

      const formattedTasks: TaskTypes[] = response.content.map((task) => ({
        ...task,
        dueDate: task.dueDate ?? '',
      }));

      setTaskData(formattedTasks);
      setTotalItems(response.totalElements);
    } catch (error) {
      const message = getApiErrorMessage(error, t);

      showToast({
        title: t('common.toast-title.fail'),
        description: message,
        variant: 'error',
      });
    } finally {
      setLoading((prev) => ({ ...prev, fetch: false }));
    }
  }, [currentPage, pageSize, search, filter, showToast, t]);

  // CREATE TASK
  const createTask = useCallback(
    async (data: TaskRequest, successMessage?: string): Promise<boolean> => {
      if (loading.create) return false;

      try {
        setLoading((prev) => ({ ...prev, create: true }));

        const response = await taskApi.create(data);

        showToast({
          title: t('common.toast-title.success'),
          description: successMessage ?? response.message,
          variant: 'success',
        });

        await fetchTasks();

        return true;
      } catch (error) {
        const message = getApiErrorMessage(error, t);

        showToast({
          title: t('common.toast-title.fail'),
          description: message,
          variant: 'error',
        });

        return false;
      } finally {
        setLoading((prev) => ({ ...prev, create: false }));
      }
    },
    [loading, fetchTasks, showToast, t]
  );

  // GET TASK BY ID
  const getTaskById = useCallback(
    async (id: string): Promise<TaskTypes | null> => {
      try {
        setLoading((prev) => ({ ...prev, fetchTask: true }));

        const response = await taskApi.getById(id);

        return {
          ...response,
          dueDate: response.dueDate ?? '',
        };
      } catch (error) {
        const message = getApiErrorMessage(error, t);

        showToast({
          title: t('common.toast-title.fail'),
          description: message,
          variant: 'error',
        });

        return null;
      } finally {
        setLoading((prev) => ({ ...prev, fetchTask: false }));
      }
    },
    [showToast, t]
  );

  // UPDATE TASK
  const updateTask = useCallback(
    async (id: string, values: TaskRequest, successMessage?: string): Promise<boolean> => {
      try {
        setLoading((prev) => ({ ...prev, update: true }));

        const payload: TaskRequest = {
          ...values,
          dueDate: values.dueDate || null,
        };

        const response = await taskApi.update(id, payload);

        showToast({
          title: t('common.toast-title.success'),
          description: successMessage ?? response.message,
          variant: 'success',
        });

        await fetchTasks();

        return true;
      } catch (error) {
        showToast({
          title: t('common.toast-title.fail'),
          description: getApiErrorMessage(error, t),
          variant: 'error',
        });

        return false;
      } finally {
        setLoading((prev) => ({ ...prev, update: false }));
      }
    },
    [fetchTasks, showToast, t]
  );

  // DELETE TASK
  const deleteTask = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        setLoading((prev) => ({ ...prev, delete: true }));

        const response = await taskApi.delete(id);

        showToast({
          title: t('common.toast-title.success'),
          description: response.message,
          variant: 'success',
        });

        await fetchTasks();

        return true;
      } catch (error) {
        showToast({
          title: t('common.toast-title.fail'),
          description: getApiErrorMessage(error, t),
          variant: 'error',
        });

        return false;
      } finally {
        setLoading((prev) => ({ ...prev, delete: false }));
      }
    },
    [fetchTasks, showToast, t]
  );

  // Fetch projects
  useEffect(() => {
    void fetchProjectDropdown();
  }, [fetchProjectDropdown]);

  // Fetch tasks
  useEffect(() => {
    void fetchTasks();
  }, [fetchTasks]);

  return {
    taskData,
    totalItems,
    isFetching: loading.fetch,
    isCreating: loading.create,
    isUpdating: loading.update,
    isDeleting: loading.delete,
    isFetchingTask: loading.fetchTask,
    projectDropdown,
    setTaskData,
    fetchTasks,
    createTask,
    updateTask,
    getTaskById,
    deleteTask,
    fetchProjectDropdown,
  };
}
