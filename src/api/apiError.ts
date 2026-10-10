import axios from 'axios';
import type { ApiErrorResponse } from './api.types';
import type { TFunction } from 'i18next';

export function getApiErrorMessage(error: unknown, t: TFunction): string {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    if (error.response?.data?.message) {
      return error.response.data.message;
    }

    if (error.code === 'ECONNABORTED') {
      return t('common.request-time-out');
    }

    if (!error.response) {
      return t('common.unable-to-connect');
    }
  }

  return t('common.went-wrong');
}
