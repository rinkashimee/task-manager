import { cn } from '@/lib/utils/utils';
import type { TextareaHTMLAttributes } from 'react';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
}

export default function Textarea(props: TextareaProps) {
  const { error = false, className, ...restProps } = props;
  return (
    <textarea
      {...restProps}
      className={cn(
        'border-input-border bg-card w-full rounded-md border px-3 py-2 pl-3',
        'text-text font-sans text-xs',
        'placeholder:text-text-muted',
        'min-h-12 resize-y',
        'transition-colors outline-none',
        'focus:border-primary',
        'disabled:cursor-not-allowed disabled:opacity-50',
        error && 'border-danger focus:border-danger',
        className
      )}
    />
  );
}
