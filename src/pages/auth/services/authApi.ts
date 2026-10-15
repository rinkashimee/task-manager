import type { ApiResponse } from '@/api/api.types';
import type { RegisterRequest, RegisterResponse } from '../register/types/Register.types';
import api from '@/api/axios';

export const authApi = {
  register: async (data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
    const response = await api.post<ApiResponse<RegisterResponse>>('/auth/register', data);

    return response.data;
  },
};
