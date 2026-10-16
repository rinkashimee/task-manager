import { tokenManager } from '@/pages/auth/services/tokenManager';
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { refreshAccessToken } from '@/pages/auth/services/refreshToken';

interface AuthRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _sessionVersion?: number;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const request = config as AuthRequestConfig;

  request._sessionVersion = tokenManager.getSessionVersion();

  const token = tokenManager.getToken();

  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }

  return request;
});

api.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as AuthRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    const isAuthEndpoint = originalRequest.url?.startsWith('/auth/');

    if (
      error.response?.status !== 401 ||
      originalRequest._retry ||
      isAuthEndpoint ||
      tokenManager.isLoggingOut() ||
      originalRequest._sessionVersion !== tokenManager.getSessionVersion()
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      const newAccessToken = await refreshAccessToken();

      if (
        tokenManager.isLoggingOut() ||
        originalRequest._sessionVersion !== tokenManager.getSessionVersion()
      ) {
        return Promise.reject(error);
      }

      originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);

      return api(originalRequest);
    } catch (refreshError) {
      if (
        !tokenManager.isLoggingOut() &&
        originalRequest._sessionVersion === tokenManager.getSessionVersion()
      ) {
        tokenManager.clearToken();
      }

      return Promise.reject(refreshError);
    }
  }
);

export default api;
