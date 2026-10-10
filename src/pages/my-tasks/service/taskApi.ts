import type { ApiResponse } from '@/api/api.types';
import type {
  ProjectOptionResponse,
  TaskPageResponse,
  TaskQueryParams,
  TaskRequest,
  TaskResponse,
} from '../types/TaskTypes';
import api from '@/api/axios';

export const taskApi = {
  getProjectDropdown: async (): Promise<ProjectOptionResponse[]> => {
    const response = await api.get<ApiResponse<ProjectOptionResponse[]>>('/projects/options');

    return response.data.data;
  },

  getAll: async (params: TaskQueryParams): Promise<TaskPageResponse> => {
    const response = await api.get<ApiResponse<TaskPageResponse>>('/tasks', { params });

    return response.data.data;
  },

  create: async (data: TaskRequest): Promise<ApiResponse<TaskResponse>> => {
    const response = await api.post<ApiResponse<TaskResponse>>('/tasks', data);

    return response.data;
  },

  getById: async (id: string): Promise<TaskResponse> => {
    const response = await api.get<ApiResponse<TaskResponse>>(`/tasks/${id}`);

    return response.data.data;
  },

  update: async (id: string, data: TaskRequest): Promise<ApiResponse<TaskResponse>> => {
    const response = await api.put<ApiResponse<TaskResponse>>(`/tasks/${id}`, data);

    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(`/tasks/${id}`);

    return response.data;
  },
};
