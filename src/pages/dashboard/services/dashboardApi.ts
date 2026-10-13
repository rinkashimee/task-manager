import type { ApiResponse } from '@/api/api.types';
import api from '@/api/axios';
import type {
  DashboardQueryParams,
  DashboardStatsTypes,
  ProjectProgressTypes,
} from '../types/Dashboard.types';
import type { TaskPageResponse, TaskTypes } from '@/pages/my-tasks/types/Task.types';

export const dashboardApi = {
  getDashboardStats: async (): Promise<DashboardStatsTypes> => {
    const response = await api.get<ApiResponse<DashboardStatsTypes>>('/dashboard/stats');

    return response.data.data;
  },

  getUpcomingDeadlines: async (): Promise<TaskPageResponse> => {
    const response = await api.get<ApiResponse<TaskPageResponse>>('/dashboard/upcoming-deadlines');

    return response.data.data;
  },

  getAllUpcomingDeadlines: async (params: DashboardQueryParams): Promise<TaskPageResponse> => {
    const response = await api.get<ApiResponse<TaskPageResponse>>(
      '/dashboard/upcoming-deadlines/all',
      { params }
    );

    return response.data.data;
  },

  getProjectProgress: async (): Promise<ProjectProgressTypes[]> => {
    const response = await api.get<ApiResponse<ProjectProgressTypes[]>>(
      '/dashboard/project-progress'
    );

    return response.data.data;
  },

  getRecentTasks: async (): Promise<TaskTypes[]> => {
    const response = await api.get<ApiResponse<TaskTypes[]>>('/dashboard/recent-tasks');

    return response.data.data;
  },
};
