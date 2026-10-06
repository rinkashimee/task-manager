import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ParseKeys } from 'i18next';

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
