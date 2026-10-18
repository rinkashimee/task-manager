import type { ApiResponse } from '@/api/api.types';
import type { RegisterRequest, RegisterResponse } from '../register/types/Register.types';
import api from '@/api/axios';
import type {
  ResendVerificationRequest,
  VerifyEmailRequest,
} from '../verify-email/types/VerifyEmail.types';
import type { AuthUser, LoginRequest, LoginResponse } from '../login/types/Login.types';
import type { ForgotPasswordRequest } from '../forgot-password/types/ForgotPassword.types';
import type { ResetPasswordRequest } from '../reset-password/types/ResetPassword.types';

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

  getCurrentUser: async (): Promise<ApiResponse<AuthUser>> => {
    const response = await api.get<ApiResponse<AuthUser>>('/auth/me');

    return response.data;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const response = await api.post<ApiResponse<null>>('/auth/logout');

    return response.data;
  },

  forgotPassword: async (values: ForgotPasswordRequest): Promise<ApiResponse<null>> => {
    const response = await api.post<ApiResponse<null>>('/auth/forgot-password', values);

    return response.data;
  },

  resetPassword: async (values: ResetPasswordRequest): Promise<ApiResponse<null>> => {
    const response = await api.post<ApiResponse<null>>('/auth/reset-password', values);

    return response.data;
  },
};
