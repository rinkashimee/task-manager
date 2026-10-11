import { useToast } from '@/components/ui/Toast/ToastProvider';
import { useTranslation } from 'react-i18next';
import type {
  ProjectLoadingState,
  ProjectQueryParams,
  ProjectRequest,
  ProjectTypes,
  UseProjectsParams,
} from '../types/Project.types';
import { useCallback, useEffect, useState } from 'react';
import { projectApi } from '../service/projectApi';
import { getApiErrorMessage } from '@/api/apiError';

export function useProject(props: UseProjectsParams) {
  const { currentPage, pageSize, search } = props;

  const { t } = useTranslation();
  const { showToast } = useToast();

  const [projectData, setProjectData] = useState<ProjectTypes[]>([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState<ProjectLoadingState>({
    fetch: true,
    fetchTask: false,
    create: false,
    update: false,
    delete: false,
  });

  // GET ALL PROJECTS
  const fetchProjects = useCallback(async () => {
    try {
      setLoading((prev) => ({ ...prev, fetch: true }));

      const params: ProjectQueryParams = {
        page: currentPage - 1,
        size: pageSize,
        search: search.trim(),
      };

      const response = await projectApi.getAll(params);

      const formattedTasks: ProjectTypes[] = response.content.map((project) => ({
        ...project,
        dueDate: project.dueDate ?? '',
        lastUpdated: project.updatedAt,
      }));

      setProjectData(formattedTasks);
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
  }, [currentPage, pageSize, search, showToast, t]);

  // CREATE PROJECT
  const createProject = useCallback(
    async (data: ProjectRequest, successMessage?: string): Promise<boolean> => {
      if (loading.create) return false;

      try {
        setLoading((prev) => ({ ...prev, create: true }));

        const response = await projectApi.create(data);

        showToast({
          title: t('common.toast-title.success'),
          description: successMessage ?? response.message,
          variant: 'success',
        });

        await fetchProjects();

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
    [loading, fetchProjects, showToast, t]
  );

  // GET PROJECT BY ID
  const getProjectById = useCallback(
    async (id: string): Promise<ProjectTypes | null> => {
      try {
        setLoading((prev) => ({ ...prev, fetchTask: true }));

        const response = await projectApi.getById(id);

        return {
          ...response,
          dueDate: response.dueDate ?? '',
          lastUpdated: response.updatedAt,
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

  // UPDATE PROJECT
  const updateProject = useCallback(
    async (id: string, values: ProjectRequest, successMessage?: string): Promise<boolean> => {
      try {
        setLoading((prev) => ({ ...prev, update: true }));

        const payload: ProjectRequest = {
          ...values,
          dueDate: values.dueDate || null,
        };

        const response = await projectApi.update(id, payload);

        showToast({
          title: t('common.toast-title.success'),
          description: successMessage ?? response.message,
          variant: 'success',
        });

        await fetchProjects();

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
    [fetchProjects, showToast, t]
  );

  // DELETE PROJECT
  const deleteProject = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        setLoading((prev) => ({ ...prev, delete: true }));

        const response = await projectApi.delete(id);

        showToast({
          title: t('common.toast-title.success'),
          description: response.message,
          variant: 'success',
        });

        await fetchProjects();

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
    [fetchProjects, showToast, t]
  );

  // Fetch projects
  useEffect(() => {
    void fetchProjects();
  }, [fetchProjects]);

  return {
    projectData,
    totalItems,
    isFetching: loading.fetch,
    isCreating: loading.create,
    isUpdating: loading.update,
    isDeleting: loading.delete,
    isFetchingTask: loading.fetchTask,
    setProjectData,
    fetchProjects,
    createProject,
    getProjectById,
    updateProject,
    deleteProject,
  };
}
