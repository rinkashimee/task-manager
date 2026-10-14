import TaskIcon, { type IconType } from '@/components/icons/TaskIcon';
import { cn } from '@/lib/utils/utils';
import { useState, type InputHTMLAttributes, type Ref } from 'react';

export type InputVariant = 'default' | 'ghost';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: InputVariant;
  error?: boolean;
  icon?: IconType;
  wrapperClassName?: string;
  hideIcon?: boolean;
  ref?: Ref<HTMLInputElement>;
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
    ref,
    className,
    wrapperClassName,
    hideIcon = false,
    ...restProps
  } = props;

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const isPassword = restProps.type === 'password';
  const isCheckbox = restProps.type === 'checkbox';

  return (
    <div
      className={cn(
        isCheckbox ? 'flex shrink-0 items-center justify-center' : 'relative',
        wrapperClassName
      )}
    >
      <div
        hidden={hideIcon}
        className="pointer-events-none absolute inset-y-0 left-4 flex items-center"
      >
        <TaskIcon size={18} icon={icon} className="text-text-muted" />
      </div>

      <input
        {...restProps}
        ref={ref}
        type={isPassword && showPassword ? 'text' : restProps.type}
        className={cn(
          isCheckbox
            ? 'accent-primary size-4 shrink-0 cursor-pointer'
            : [
                'h-10 w-full rounded-md px-3',
                'text-text font-sans text-xs',
                'placeholder:text-text-muted',
                'transition-colors outline-none',
                'disabled:bg-background disabled:text-text-muted',
                'disabled:cursor-not-allowed',
                icon && !hideIcon ? 'pl-10' : 'pl-3',
                variants[variant],
                error && 'border-danger focus:border-danger',
              ],
          className
        )}
      />

      {isPassword && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          disabled={restProps.disabled}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
          aria-pressed={showPassword}
          className={cn(
            'text-text-muted absolute inset-y-0 right-3 flex items-center justify-center',
            'hover:text-primary cursor-pointer transition-colors',
            'disabled:cursor-not-allowed disabled:opacity-50'
          )}
        >
          <TaskIcon icon={showPassword ? 'EyeSlashIcon' : 'EyeIcon'} size={18} />
        </button>
      )}
    </div>
  );
}
