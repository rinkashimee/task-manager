import type { ApiResponse } from '@/api/api.types';
import axios from 'axios';
import type { RefreshResponse } from '../login/types/Login.types';
import { tokenManager } from './tokenManager';

const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  timeout: 10000,
});

let refreshPromise: Promise<string> | null = null;

export function refreshAccessToken(): Promise<string> {
  if (tokenManager.isLoggingOut()) {
    return Promise.reject(new Error('Logout is in progress.'));
  }

  if (refreshPromise) {
    return refreshPromise;
  }

  const version = tokenManager.getSessionVersion();

  const request = refreshApi
    .post<ApiResponse<RefreshResponse>>('/auth/refresh')
    .then(({ data }) => {
      if (!data.success || !data.data?.accessToken) {
        throw new Error('Unable to refresh access token.');
      }

      if (tokenManager.isLoggingOut() || version !== tokenManager.getSessionVersion()) {
        throw new Error('Authentication session has changed.');
      }

      tokenManager.setToken(data.data.accessToken);

      return data.data.accessToken;
    });

  refreshPromise = request.finally(() => {
    if (refreshPromise === trackedPromise) {
      refreshPromise = null;
    }
  });

  const trackedPromise = refreshPromise;

  return trackedPromise;
}

export async function waitForPendingRefresh(): Promise<void> {
  const pending = refreshPromise;

  if (!pending) return;

  try {
    await pending;
  } catch {}
}
