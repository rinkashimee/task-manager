import { useToast } from '@/components/ui/Toast/ToastProvider';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type {
  DashboardLoadingState,
  DashboardQueryParams,
  DashboardStatsTypes,
  UseDashboardParams,
} from '../types/Dashboard.types';
import { dashboardApi } from '../services/dashboardApi';
import { getApiErrorMessage } from '@/api/apiError';
import type { TaskTypes } from '@/pages/my-tasks/types/Task.types';
import { taskApi } from '@/pages/my-tasks/service/taskApi';
import type { DropdownOption } from '@/components/ui/Dropdown/Dropdown.types';
import { useSpinner } from '@/components/ui/Spinner/SpinnerContext';

export function useDashboard(props: UseDashboardParams) {
  const { pageSize, currentPage } = props;

  const { t } = useTranslation();
  const { showToast } = useToast();
  const { showLoading, hideLoading } = useSpinner();

  const [upcomingDeadlines, setUpcomingDeadlines] = useState<TaskTypes[]>([]);
  const [allDeadlines, setAllDeadlines] = useState<TaskTypes[]>([]);
  const [projectDropdown, setProjectDropdown] = useState<DropdownOption[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [dashboardStat, setDashboardStat] = useState<DashboardStatsTypes>({
    totalTasks: 0,
    completedTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0,
  });
  const [loading, setLoading] = useState<DashboardLoadingState>({
    fetch: true,
    fetchStat: true,
    fetchDeadline: true,
    fetchAllDeadline: false,
    fetchTask: true,
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

  // GET DASHBOARD STATS
  const fetchDashboardStats = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, fetchStat: true }));

      const response = await dashboardApi.getDashboardStats();

      setDashboardStat(response);
    } catch (error) {
      const message = getApiErrorMessage(error, t);

      showToast({
        title: t('common.toast-title.fail'),
        description: message,
        variant: 'error',
      });
    } finally {
      setLoading((prev) => ({ ...prev, fetchStat: false }));
    }
  }, [showToast, t]);

  // GET UPCOMING DEADLINE TASKS
  const fetchUpcomingDeadlines = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, fetchDeadline: true }));

      const response = await dashboardApi.getUpcomingDeadlines();

      const formattedTasks: TaskTypes[] = response.content.map((task) => ({
        ...task,
        dueDate: task.dueDate ?? '',
      }));

      setUpcomingDeadlines(formattedTasks);
    } catch (error) {
      const message = getApiErrorMessage(error, t);

      showToast({
        title: t('common.toast-title.fail'),
        description: message,
        variant: 'error',
      });
    } finally {
      setLoading((prev) => ({ ...prev, fetchDeadline: false }));
    }
  }, [showToast, t]);

  // GET ALL UPCOMING DEADLINE TASKS
  const fetchAllUpcomingDeadlines = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, fetchAllDeadline: true }));

      const params: DashboardQueryParams = {
        page: currentPage - 1,
        size: pageSize,
      };

      const response = await dashboardApi.getAllUpcomingDeadlines(params);

      const formattedTasks: TaskTypes[] = response.content.map((task) => ({
        ...task,
        dueDate: task.dueDate ?? '',
      }));

      setAllDeadlines(formattedTasks);
      setTotalItems(response.totalElements);
    } catch (error) {
      const message = getApiErrorMessage(error, t);

      showToast({
        title: t('common.toast-title.fail'),
        description: message,
        variant: 'error',
      });
    } finally {
      setLoading((prev) => ({ ...prev, fetchAllDeadline: false }));
    }
  }, [pageSize, currentPage, showToast, t]);

  // GET TASK BY ID
  const getTaskById = useCallback(
    async (id: string): Promise<TaskTypes | null> => {
      try {
        setLoading((prev) => ({ ...prev, fetchTask: true }));
        showLoading();

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
        hideLoading();
      }
    },
    [showToast, t]
  );

  return {
    dashboardStat,
    projectDropdown,
    upcomingDeadlines,
    allDeadlines,
    totalItems,
    isFetchStat: loading.fetchStat,
    isFetchDeadline: loading.fetchDeadline,
    isFetchAllDeadline: loading.fetchAllDeadline,
    fetchProjectDropdown,
    fetchDashboardStats,
    fetchUpcomingDeadlines,
    getTaskById,
    fetchAllUpcomingDeadlines,
  };
}
