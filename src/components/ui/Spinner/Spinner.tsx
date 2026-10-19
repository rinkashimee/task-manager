import { cn } from '@/lib/utils/utils';
import Typography from '../Typography/Typography';
import type { SpinnerProps } from './Spinner.types';

export default function Spinner(props: SpinnerProps) {
  const { className, message } = props;

  return (
    <div
      role="status"
      aria-live="polite"
      className={cn(
        'flex min-h-16 min-w-16 flex-col items-center justify-center',
        'gap-1.5 rounded-xl px-3 py-3',
        'sm:min-h-20 sm:min-w-20 sm:gap-2 sm:px-4 sm:py-4',
        'bg-background border-border border shadow-lg',
        className
      )}
    >
      <div className="relative h-5 w-5 animate-spin">
        <span className="bg-primary/40 absolute top-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full" />
        <span className="bg-primary/60 absolute top-1/2 right-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full" />
        <span className="bg-primary absolute bottom-0 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full" />
        <span className="bg-primary/80 absolute top-1/2 left-0 h-1.5 w-1.5 -translate-y-1/2 rounded-full" />
      </div>

      <Typography
        variant="caption"
        className="text-primary text-center text-[11px] whitespace-nowrap sm:text-xs"
      >
        {message}
      </Typography>
    </div>
  );
}
