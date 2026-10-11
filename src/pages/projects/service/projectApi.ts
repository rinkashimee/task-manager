import type { ApiResponse } from '@/api/api.types';
import type {
  ProjectPageResponse,
  ProjectQueryParams,
  ProjectRequest,
  ProjectResponse,
} from '../types/Project.types';
import api from '@/api/axios';

export const projectApi = {
  getAll: async (params: ProjectQueryParams): Promise<ProjectPageResponse> => {
    const response = await api.get<ApiResponse<ProjectPageResponse>>('/projects', { params });

    return response.data.data;
  },

  create: async (data: ProjectRequest): Promise<ApiResponse<ProjectResponse>> => {
    const response = await api.post<ApiResponse<ProjectResponse>>('/projects', data);

    return response.data;
  },

  getById: async (id: string): Promise<ProjectResponse> => {
    const response = await api.get<ApiResponse<ProjectResponse>>(`/projects/${id}`);

    return response.data.data;
  },

  update: async (id: string, data: ProjectRequest): Promise<ApiResponse<ProjectResponse>> => {
    const response = await api.put<ApiResponse<ProjectResponse>>(`/projects/${id}`, data);

    return response.data;
  },

  delete: async (id: string): Promise<ApiResponse<null>> => {
    const response = await api.delete<ApiResponse<null>>(`/projects/${id}`);

    return response.data;
  },
};
