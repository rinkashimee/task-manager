import { useTranslation } from 'react-i18next';
import type { ProjectTypes } from '../types/Project.types';
import TaskIcon from '@/components/icons/TaskIcon';
import { projectIcons, projectStatusVariants } from '../constant/ProjectConstant';
import Typography from '@/components/ui/Typography/Typography';
import Badge from '@/components/ui/Badge/Badge';
import { projectStatusOptions } from '@/constants/projectStatusOptions';
import { cn } from '@/lib/utils/utils';

interface ProjectViewHeaderProps {
  viewProject: ProjectTypes;
  viewTasksDesc?: string;
}

export default function ProjectViewHeader(props: ProjectViewHeaderProps) {
  const { viewProject, viewTasksDesc } = props;

  const { t } = useTranslation();

  const projectIcon = projectIcons.find((item) => item.value === viewProject.projectIcon);

  const selectedPriority = projectStatusOptions.find(
    (option) => option.value === viewProject.status
  );

  return (
    <div className="flex items-center gap-4">
      <div
        className={cn(
          'flex size-12 shrink-0 items-center justify-center rounded-xl',
          projectIcon?.color ?? 'bg-primary/10 text-primary'
        )}
      >
        <TaskIcon icon={projectIcon?.icon ?? 'GlobeIcon'} size={24} />
      </div>

      <div className="flex min-w-0 flex-col gap-2">
        <Typography as="h2" variant="body-lg" className="text-text font-sans font-semibold">
          {viewProject.name}
        </Typography>

        <div className="flex flex-wrap items-center gap-2">
          {viewTasksDesc ? (
            <Typography variant="caption" className="text-text-muted font-sans">
              {viewTasksDesc}
            </Typography>
          ) : (
            <Badge variant={projectStatusVariants[viewProject.status]}>
              {selectedPriority?.labels ? t(selectedPriority.labels) : viewProject.status}
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
