import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ParseKeys } from 'i18next';
import type { FormatDateOptions } from './utils.types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGreeting(): ParseKeys {
  const hour = new Date().getHours();

  if (hour < 12) {
    return 'common.morning';
  }

  if (hour < 18) {
    return 'common.afternoon';
  }

  return 'common.evening';
}

export const generateId = (): string => {
  const random = Math.random().toString(36).slice(2, 7).toUpperCase();

  return `TID-${random}`;
};

export function formatDate(
  date: string | Date | null | undefined,
  options: FormatDateOptions = {}
): string {
  const { includeTime = false } = options;

  if (!date) return '';

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return '-';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...(includeTime && {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    }),
  }).format(parsedDate);
}
