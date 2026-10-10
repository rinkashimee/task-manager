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

  //   getById: async (id: string): Promise<TaskTypes> => {
  //     const response = await api.get<ApiResponse<TaskTypes>>(`/tasks/${id}`);

  //     return response.data.data;
  //   },

  //   update: async (id: string, data: TaskRequest): Promise<TaskTypes> => {
  //     const response = await api.put<ApiResponse<TaskTypes>>(`/tasks/${id}`, data);

  //     return response.data.data;
  //   },

  //   delete: async (id: string): Promise<void> => {
  //     await api.delete(`/tasks/${id}`);
  //   },
};
