import { cn } from '@/lib/utils/utils';
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'ghost';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-primary text-text-inverse hover:bg-primary/90',
  ghost: 'bg-transparent',
};

export default function Button(props: ButtonProps) {
  const { children, className, type = 'button', variant = 'primary' } = props;

  return (
    <button
      {...props}
      type={type}
      className={cn(
        'inline-flex items-center justify-center',
        'rounded-md',
        'transition-colors',
        'cursor-pointer',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        className
      )}
    >
      {children}
    </button>
  );
}
