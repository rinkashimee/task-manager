import { cn } from '@/lib/utils/utils';
import { projectIcons } from '@/pages/projects/constant/ProjectConstant';
import type { ProjectProgressTypes } from '../types/Dashboard.types';
import { useTranslation } from 'react-i18next';
import TaskIcon from '@/components/icons/TaskIcon';
import Typography from '@/components/ui/Typography/Typography';

interface ProjectProgressItemProps {
  project: ProjectProgressTypes;
}

export default function ProjectProgressItem(props: ProjectProgressItemProps) {
  const { project } = props;

  const { t } = useTranslation();

  const projectIcon = projectIcons.find((item) => item.value === project.projectIcon);

  const progressColor =
    projectIcon?.color
      .split(' ')
      .find((color) => color.startsWith('bg-'))
      ?.replace('/10', '') ?? 'bg-primary';

  return (
    <div className="flex flex-col gap-2.5 px-2 py-2">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2">
          <div
            className={cn(
              'flex size-10 shrink-0 items-center justify-center rounded-lg',
              projectIcon?.color ?? 'bg-primary/10 text-primary'
            )}
          >
            <TaskIcon icon={projectIcon?.icon ?? 'GlobeIcon'} size={20} />
          </div>

          <div className="flex min-w-0 flex-col gap-1">
            <Typography variant="caption" className="text-text truncate font-semibold">
              {project.name}
            </Typography>

            <Typography variant="caption" className="text-text-muted">
              {t('project.table.tasks', {
                completeTasks: project.completedTasks,
                totalTasks: project.totalTasks,
              })}
            </Typography>
          </div>
        </div>

        <Typography variant="caption" className="text-text shrink-0 font-semibold">
          {t('project.table.percent', { value: project.progress })}
        </Typography>
      </div>

      <div
        className={cn(
          'h-2 w-full overflow-hidden rounded-full',
          projectIcon?.color ?? 'bg-primary/10 text-primary'
        )}
      >
        <div
          className={cn('h-full rounded-full transition-all duration-300', progressColor)}
          style={{
            width: `${Math.min(100, Math.max(0, project.progress))}%`,
          }}
        />
      </div>
    </div>
  );
}
