import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { ParseKeys } from 'i18next';
import type { FormatDateOptions } from './utils.types';

const MAX_DIMENSION = 512;
const IMAGE_QUALITY = 0.8;

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

export async function compressImage(file: File): Promise<File> {
  if (file.type === 'image/gif') {
    return file;
  }

  const bitmap = await createImageBitmap(file);

  try {
    const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));

    const width = Math.max(1, Math.round(bitmap.width * scale));
    const height = Math.max(1, Math.round(bitmap.height * scale));

    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;

    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Unable to process image.');
    }

    // White background for transparent PNG images.
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, width, height);

    context.drawImage(bitmap, 0, 0, width, height);

    const blob = await new Promise<Blob>((resolve, reject) => {
      canvas.toBlob(
        (result) => {
          if (!result) {
            reject(new Error('Unable to compress image.'));
            return;
          }

          resolve(result);
        },
        'image/jpeg',
        IMAGE_QUALITY
      );
    });

    const compressedFile = new File([blob], file.name.replace(/\.[^.]+$/, '') + '.jpg', {
      type: 'image/jpeg',
      lastModified: Date.now(),
    });

    return compressedFile.size < file.size ? compressedFile : file;
  } finally {
    bitmap.close();
  }
}
