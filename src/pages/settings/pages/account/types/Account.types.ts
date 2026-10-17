import type { AuthUser } from '@/pages/auth/login/types/Login.types';

export interface AccountFormTypes {
  name: string;
  email: string;
  role: string;
}

export interface UpdateProfileRequest {
  name: string;
}

export interface ProfileImageResponse {
  profileImage: string;
}

export type UpdateProfileResponse = AuthUser;
