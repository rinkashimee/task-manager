import Typography from '@/components/ui/Typography/Typography';
import TaskIcon from '@/components/icons/TaskIcon';
import type { ProjectProgressTypes } from '../types/Dashboard.types';
import { useTranslation } from 'react-i18next';
import Button from '@/components/ui/Button/Button';
import { cn } from '@/lib/utils/utils';
import ProjectProgressItem from './ProjectProgressItem';
import ProjectProgressSkeleton from './dashboard-skeleton/ProjectProgressSkeleton';

interface ProjectProgressProps {
  isLoading: boolean;
  projects: ProjectProgressTypes[];
  handView: () => void;
}

export default function ProjectProgress(props: ProjectProgressProps) {
  const { isLoading, projects, handView } = props;

  const { t } = useTranslation();

  return (
    <div className="border-border bg-card flex h-auto min-h-[220px] flex-col rounded-md border px-2 lg:h-[365px]">
      <div className="border-border flex shrink-0 items-center justify-between border-b px-2 py-2">
        <Typography variant="body-sm" className="text-text font-semibold">
          {t('dashboard.project-progress')}
        </Typography>

        <Button
          variant="ghost"
          className="text-text hover:text-primary h-8 gap-2 px-2.5 font-sans"
          onClick={handView}
        >
          <Typography as="p" variant="caption" className="truncate !font-semibold">
            {t('common.viewAll')}
          </Typography>

          <TaskIcon icon="CaretRightIcon" size={14} />
        </Button>
      </div>

      <div
        className={cn(
          'mt-1.5 min-h-0 flex-1 pb-3',
          'overflow-y-auto',
          '[scrollbar-width:none]',
          '[&::-webkit-scrollbar]:hidden'
        )}
      >
        {isLoading ? (
          <ProjectProgressSkeleton />
        ) : projects.length === 0 ? (
          <div className="flex h-full flex-col items-center justify-center gap-2">
            <div className="bg-primary/10 flex size-11 items-center justify-center rounded-full">
              <TaskIcon icon="FolderOpenIcon" size={22} className="text-primary" />
            </div>

            <div className="flex flex-col items-center gap-1">
              <Typography variant="body-sm" className="text-text font-semibold">
                {t('common.no-projects')}
              </Typography>

              <Typography variant="caption" className="text-text-muted text-center">
                {t('common.project-progress-caption')}
              </Typography>
            </div>
          </div>
        ) : (
          <div className="flex flex-col">
            {projects.map((project) => (
              <ProjectProgressItem key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
