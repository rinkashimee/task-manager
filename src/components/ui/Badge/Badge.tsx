import { cn } from '@/lib/utils/utils';
import type { BadgeProps, BadgeVariant } from './Badge.types';
import Typography from '../Typography/Typography';

const variants: Record<BadgeVariant, string> = {
  default: 'bg-indigo-100 text-text',
  info: 'bg-info/30 text-info',
  success: 'bg-success/30 text-success',
  warning: 'bg-warning/30 text-warning',
  danger: 'bg-danger/30 text-danger',
};

export default function Badge(props: BadgeProps) {
  const { variant = 'default', className, children, ...restProps } = props;

  return (
    <Typography
      {...restProps}
      variant="caption"
      className={cn(
        'inline-flex w-fit items-center',
        'rounded-full px-2 py-0.5',
        'font-sans font-medium whitespace-nowrap',
        variants[variant],
        className
      )}
    >
      {children}
    </Typography>
  );
}
