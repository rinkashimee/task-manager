import TaskIcon, { type IconType } from '@/components/icons/TaskIcon';
import { cn } from '@/lib/utils/utils';
import type { InputHTMLAttributes } from 'react';

export type InputVariant = 'default' | 'ghost';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  error?: boolean;
  icon?: IconType;
  wrapperClassName?: string;
  hideIcon?: boolean;
}

const variants: Record<InputVariant, string> = {
  default: 'border border-input-border bg-card focus:border-primary',
  ghost: 'border border-transparent bg-transparent focus:border-primary',
};

export default function Input(props: InputProps) {
  const {
    variant = 'default',
    icon = 'UserCircleIcon',
    error,
    className,
    wrapperClassName,
    hideIcon = false,
    ...restProps
  } = props;

  return (
    <div className={cn('relative', wrapperClassName)}>
      <div
        hidden={hideIcon}
        className="pointer-events-none absolute inset-y-0 left-4 flex items-center"
      >
        <TaskIcon size={18} icon={icon} className="text-text-muted" />
      </div>

      <input
        {...restProps}
        className={cn(
          'h-10 w-full rounded-md px-3',
          'text-text font-sans text-xs',
          'placeholder:text-text-muted',
          'transition-colors outline-none',
          'disabled:cursor-not-allowed disabled:opacity-50',
          icon && !hideIcon ? 'pl-10' : 'pl-3',
          variants[variant],
          error && 'border-danger focus:border-danger',
          className
        )}
      />
    </div>
  );
}
