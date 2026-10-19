import { tokenManager } from '@/pages/auth/services/tokenManager';
import axios, { AxiosError, type InternalAxiosRequestConfig } from 'axios';
import { refreshAccessToken } from '@/pages/auth/services/refreshToken';
import { decryptPayload, encryptPayload, generateEncryptionKey } from './encryption/encryption';
import type { EncryptedData } from './encryption/encryption.types';

interface AuthRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _sessionVersion?: number;

  // Encryption
  _aesKey?: CryptoKey;
  _originalData?: unknown;
  _encrypted?: boolean;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use(async (config) => {
  const request = config as AuthRequestConfig;

  request._sessionVersion ??= tokenManager.getSessionVersion();

  const token = tokenManager.getToken();

  if (token) {
    request.headers.set('Authorization', `Bearer ${token}`);
  }

  if (!request._encrypted) {
    request._originalData = request.data;
  }

  const isFormData = request._originalData instanceof FormData;

  if (isFormData) {
    const { encryptedKey, aesKey } = await generateEncryptionKey();

    request.data = request._originalData;
    request._aesKey = aesKey;

    request.headers.set('X-Encrypted-Key', encryptedKey);
    request.headers.delete('Content-Type');
  } else if (request._originalData !== undefined && request._originalData !== null) {
    const originalData =
      typeof request._originalData === 'string'
        ? JSON.parse(request._originalData)
        : request._originalData;

    const { encrypted, aesKey } = await encryptPayload(originalData);

    request.headers.delete('X-Encrypted-Key');
    request.data = encrypted;
    request._aesKey = aesKey;
  } else {
    const { encryptedKey, aesKey } = await generateEncryptionKey();

    request.data = undefined;
    request.headers.set('X-Encrypted-Key', encryptedKey);
    request._aesKey = aesKey;
  }

  request.headers.set('X-Payload-Encrypted', 'true');
  request._encrypted = true;

  return request;
});

api.interceptors.response.use(
  async (response) => {
    const request = response.config as AuthRequestConfig;

    if (response.headers['x-payload-encrypted'] === 'true' && request._aesKey) {
      response.data = await decryptPayload(response.data as EncryptedData, request._aesKey);
    }

    return response;
  },

  async (error: AxiosError) => {
    const originalRequest = error.config as AuthRequestConfig | undefined;

    if (!originalRequest) {
      return Promise.reject(error);
    }

    if (
      error.response &&
      error.response.headers['x-payload-encrypted'] === 'true' &&
      originalRequest._aesKey
    ) {
      try {
        error.response.data = await decryptPayload(
          error.response.data as EncryptedData,
          originalRequest._aesKey
        );
      } catch {
        return Promise.reject(error);
      }
    }

    const isAuthEndpoint =
      originalRequest.url?.startsWith('/auth/') && !originalRequest.url?.startsWith('/auth/me');

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
