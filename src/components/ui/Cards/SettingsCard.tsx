import type { ReactNode } from 'react';

import Typography from '@/components/ui/Typography/Typography';
import { cn } from '@/lib/utils/utils';

interface SettingsCardProps {
  title: string;
  caption: string;
  children: ReactNode;
  className?: string;
}

export default function SettingsCard(props: SettingsCardProps) {
  const { title, caption, children, className } = props;

  return (
    <div className={cn('bg-card border-border rounded-md border px-6 py-5', className)}>
      <div className="mb-4">
        <Typography variant="body" className="text-text !font-bold">
          {title}
        </Typography>

        <Typography variant="caption" className="text-text-muted">
          {caption}
        </Typography>
      </div>

      {children}
    </div>
  );
}
