import api from '@/api/axios';
import type {
  ProfileImageResponse,
  UpdateProfileRequest,
  UpdateProfileResponse,
} from '../types/Account.types';
import type { ApiResponse } from '@/api/api.types';

export const userApi = {
  updateProfile: async (
    data: UpdateProfileRequest
  ): Promise<ApiResponse<UpdateProfileResponse>> => {
    const response = await api.patch<ApiResponse<UpdateProfileResponse>>('/users/me', data);

    return response.data;
  },

  uploadProfileImage: async (file: File): Promise<ApiResponse<ProfileImageResponse>> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.put<ApiResponse<ProfileImageResponse>>(
      '/users/me/avatar',
      formData,
      {
        timeout: 30000,
      }
    );

    return response.data;
  },

  deleteProfileImage: async (): Promise<ApiResponse<void>> => {
    const response = await api.delete<ApiResponse<void>>('/users/me/avatar');

    return response.data;
  },
};
