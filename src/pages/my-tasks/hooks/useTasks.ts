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
    async (data: TaskRequest): Promise<boolean> => {
      if (loading.create) return false;

      try {
        setLoading((prev) => ({ ...prev, create: true }));

        const response = await taskApi.create(data);

        showToast({
          title: t('common.toast-title.success'),
          description: response.message,
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

  useEffect(() => {
    void fetchProjectDropdown();
    void fetchTasks();
  }, [fetchTasks]);

  return {
    taskData,
    totalItems,
    isFetching: loading.fetch,
    isCreating: loading.create,
    isUpdating: loading.update,
    isDeleting: loading.delete,
    projectDropdown,
    setTaskData,
    fetchTasks,
    createTask,
    fetchProjectDropdown,
  };
}
