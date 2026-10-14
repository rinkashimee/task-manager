import taskManagerLogo from '@/assets/task-manager-logo.svg';
import TaskIcon from '@/components/icons/TaskIcon';
import Typography from '@/components/ui/Typography/Typography';
import { cn } from '@/lib/utils/utils';
import { useTranslation } from 'react-i18next';

export default function AuthBranding() {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        'bg-surface relative hidden h-full flex-col justify-between overflow-hidden px-10 py-12 lg:flex',
        'bg-[linear-gradient(160deg,var(--surface)_0%,var(--surface-accent)_100%)]'
      )}
    >
      <div className="pointer-events-none absolute -top-30 left-1/2 size-55 -translate-x-1/2 rounded-full bg-indigo-600/20 blur-[120px]" />

      <div className="relative z-10 flex flex-1 flex-col justify-center gap-4">
        <img src={taskManagerLogo} alt="Task Manager Logo" className="size-12" />

        <div className="flex flex-col gap-2">
          <Typography variant="h2" className="font-heading text-text-inverse !font-bold">
            {t('auth.brand.title')}
          </Typography>

          <Typography
            variant="body-sm"
            className="text-text-muted max-w-60 font-sans leading-relaxed"
          >
            {t('auth.brand.desc')}
          </Typography>
        </div>
      </div>

      <div className="relative z-10 flex flex-col gap-2">
        <TaskIcon icon="MagicWandIcon" size={28} className="text-primary" />

        <Typography variant="body-sm" className="text-text-muted font-sans whitespace-pre-line">
          {t('sidebar.footer')}
        </Typography>
      </div>
    </div>
  );
}
