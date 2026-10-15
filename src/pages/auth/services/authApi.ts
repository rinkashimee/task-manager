import type { ApiResponse } from '@/api/api.types';
import type { RegisterRequest, RegisterResponse } from '../register/types/Register.types';
import api from '@/api/axios';
import type {
  ResendVerificationRequest,
  VerifyEmailRequest,
} from '../verify-email/types/VerifyEmail.types';
import type { LoginRequest, LoginResponse } from '../login/types/Login.types';

export const authApi = {
  register: async (data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> => {
    const response = await api.post<ApiResponse<RegisterResponse>>('/auth/register', data);

    return response.data;
  },

  resendVerification: async (values: ResendVerificationRequest): Promise<ApiResponse<null>> => {
    const response = await api.post('/auth/resend-verification', values);

    return response.data;
  },

  verifyEmail: async (values: VerifyEmailRequest): Promise<ApiResponse<null>> => {
    const response = await api.post('/auth/verify-email', values);

    return response.data;
  },

  login: async (values: LoginRequest): Promise<ApiResponse<LoginResponse>> => {
    const response = await api.post<ApiResponse<LoginResponse>>('/auth/login', values);

    return response.data;
  },
};
