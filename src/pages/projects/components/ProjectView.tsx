import TaskIcon, { type IconType } from '@/components/icons/TaskIcon';
import Button from '@/components/ui/Button/Button';
import Typography from '@/components/ui/Typography/Typography';
import { cn, formatDate } from '@/lib/utils/utils';
import type { ProjectTypes } from '../types/Project.types';
import { projectIcons } from '../constant/ProjectConstant';
import { useTranslation } from 'react-i18next';
import { projectStatusOptions } from '@/constants/projectStatusOptions';
import type { TaskResponse } from '@/pages/my-tasks/types/Task.types';

interface ProjectDetailProps {
  label: string;
  value: React.ReactNode;
}

interface ProjectStatProps {
  icon: IconType;
  label: string;
  value: string | number;
  progress?: number;
}

interface ProjectViewProps {
  project: ProjectTypes;
  recentTasks?: TaskResponse[];
  onEdit: () => void;
  onViewAllTasks: () => void;
}

export default function ProjectView(props: ProjectViewProps) {
  const { project, recentTasks = [], onEdit, onViewAllTasks } = props;

  const { t } = useTranslation();

  const projectIcon = projectIcons.find((item) => item.value === project.projectIcon);

  const selectedStatus = projectStatusOptions.find((option) => option.value === project.status);

  const progress = Math.min(100, Math.max(0, project.progress ?? 0));

  return (
    <div className="flex min-w-0 flex-col gap-4 px-4 pb-4 sm:px-5 sm:pb-5">
      <div className="border-border border-t" />

      <div className="border-border grid grid-cols-2 gap-y-4 border-b pb-4 lg:grid-cols-4">
        <ProjectStat
          icon="CalendarDotsIcon"
          label={t('project.view.due-date')}
          value={formatDate(project.dueDate)}
        />

        <ProjectStat
          icon="ChartBarIcon"
          label={t('project.view.progress')}
          value={t('project.table.percent', { value: progress })}
          progress={progress}
        />

        <ProjectStat
          icon="ListBulletsIcon"
          label={t('project.view.total-tasks')}
          value={project.totalTasks}
        />

        <ProjectStat
          icon="CheckCircleIcon"
          label={t('project.view.completed-tasks')}
          value={project.completedTasks}
        />
      </div>

      <div className="bg-background dark:bg-card border-border rounded-lg border px-4 py-3">
        <div className="mb-4 flex items-center justify-between gap-3">
          <Typography variant="body-sm" className="text-text font-sans font-semibold">
            {t('project.view.project-details')}
          </Typography>

          <Button
            type="button"
            variant="secondary"
            onClick={onEdit}
            className={cn('bg-card text-text h-8 gap-2 px-2.5 font-sans', 'dark:bg-background')}
          >
            <TaskIcon icon="PencilSimpleIcon" size={14} />

            <Typography as="p" variant="caption" className="truncate">
              {t('common.edit', { name: t('project.name') })}
            </Typography>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-x-4 gap-y-3 sm:grid-cols-[110px_minmax(0,1fr)]">
          <ProjectDetail label={t('project.view.name')} value={project.name} />

          <ProjectDetail
            label={t('project.view.desc')}
            value={project.description || t('common.view-desc')}
          />

          <ProjectDetail
            label={t('project.view.status')}
            value={
              <span className="inline-flex items-center gap-2 capitalize">
                {selectedStatus?.icon ?? 'bg-info size-2.5 rounded-full'}
                {selectedStatus?.labels ? t(selectedStatus.labels) : project.status}
              </span>
            }
          />

          <ProjectDetail
            label={t('project.view.projectIcon')}
            value={
              <div className="flex items-center gap-2">
                <div
                  className={cn(
                    'flex size-8 items-center justify-center rounded-lg',
                    projectIcon?.color ?? 'bg-primary/10 text-primary'
                  )}
                >
                  <TaskIcon icon={projectIcon?.icon ?? 'GlobeIcon'} size={18} />
                </div>

                <span className="capitalize">{projectIcon?.value ?? 'globe'}</span>
              </div>
            }
          />

          <ProjectDetail
            label={t('project.view.created-at')}
            value={formatDate(project.createdAt, {
              includeTime: true,
            })}
          />

          <ProjectDetail
            label={t('project.view.last-updated')}
            value={formatDate(project.lastUpdated, {
              includeTime: true,
            })}
          />

          <ProjectDetail label={t('project.view.due-date')} value={formatDate(project.dueDate)} />
        </div>
      </div>

      <div className="bg-card border-border overflow-hidden rounded-lg border">
        <div className="bg-background flex items-center justify-between gap-3 px-4 py-3">
          <Typography variant="body-sm" className="text-text font-sans font-semibold">
            {t('common.recent', { name: t('my-tasks.name-s') })}
          </Typography>

          <Button
            type="button"
            variant="ghost"
            onClick={onViewAllTasks}
            className="text-text hover:text-primary h-8 gap-2 px-2.5 font-sans"
          >
            <Typography as="p" variant="caption" className="truncate">
              {t('common.view-all', { name: t('my-tasks.name-s') })}
            </Typography>

            <TaskIcon icon="CaretRightIcon" size={14} />
          </Button>
        </div>

        <div className="flex flex-col">
          {recentTasks.length > 0 ? (
            recentTasks.slice(0, 5).map((task) => {
              const isCompleted = task.status === 'completed';

              return (
                <div
                  key={task.id}
                  className="border-border flex items-center gap-3 border-t px-4 py-3"
                >
                  <TaskIcon
                    icon={isCompleted ? 'CheckCircleIcon' : 'CircleIcon'}
                    size={16}
                    weight={isCompleted ? 'fill' : 'regular'}
                    className={cn('shrink-0', isCompleted ? 'text-success' : 'text-text-muted')}
                  />

                  <Typography
                    variant="caption"
                    className={cn(
                      'text-text min-w-0 flex-1 truncate font-sans',
                      isCompleted && 'text-text-muted line-through'
                    )}
                  >
                    {task.title}
                  </Typography>

                  <Typography
                    variant="caption"
                    className="text-text-muted max-w-24 shrink-0 truncate font-sans sm:max-w-none"
                  >
                    {formatDate(task.dueDate)}
                  </Typography>
                </div>
              );
            })
          ) : (
            <div className="border-border border-t px-4 py-6 text-center">
              <Typography variant="caption" className="text-text-muted">
                {t('common.no-task-yet')}
              </Typography>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProjectStat({ icon, label, value, progress }: ProjectStatProps) {
  return (
    <div
      className={cn(
        'flex min-w-0 items-start gap-2 px-2',
        'border-border border-r',
        'nth-[2n]:border-r-0',
        'lg:nth-[2n]:border-r',
        'lg:last:!border-r-0'
      )}
    >
      <div className="bg-primary/10 flex size-8 shrink-0 items-center justify-center rounded-lg">
        <TaskIcon icon={icon} size={20} className="text-primary shrink-0" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Typography variant="caption" className="text-text-muted font-sans">
          {label}
        </Typography>

        <Typography variant="caption" className="text-text font-sans font-semibold break-words">
          {value}
        </Typography>

        {progress !== undefined && (
          <div className="bg-border mt-1 h-1.5 w-full overflow-hidden rounded-full">
            <div
              className="bg-primary h-full rounded-full transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectDetail({ label, value }: ProjectDetailProps) {
  return (
    <div className="flex min-w-0 flex-col gap-1">
      <Typography variant="caption" className="text-text-muted font-sans">
        {label}
      </Typography>

      <Typography variant="caption" className="text-text font-sans break-words">
        {value}
      </Typography>
    </div>
  );
}
