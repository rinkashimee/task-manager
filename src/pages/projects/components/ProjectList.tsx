import type { HandleTypes } from '@/constants/commonContants';
import type { ProjectTypes } from '../types/Project.types';
import { useTranslation } from 'react-i18next';
import ListItem from '@/components/ui/ListItem/ListItem';
import ActionMenu from '@/components/ui/Table/ActionMenu';
import Badge from '@/components/ui/Badge/Badge';
import { projectStatusOptions } from '@/constants/projectStatusOptions';
import { projectIcons, projectStatusVariants } from '../constant/ProjectConstant';
import TaskIcon from '@/components/icons/TaskIcon';
import Typography from '@/components/ui/Typography/Typography';
import { cn, formatDate } from '@/lib/utils/utils';

interface ProjectListProps {
  data: ProjectTypes[];
  onViewHandle: (task: ProjectTypes) => void;
  onEditHandle: (task: ProjectTypes) => void;
  projectConfirmationModal: (task: ProjectTypes, handleType: HandleTypes) => void;
}

export default function ProjectList(props: ProjectListProps) {
  const { data, onViewHandle, onEditHandle, projectConfirmationModal } = props;

  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3">
      {data.map((project) => {
        const selectedStatus = projectStatusOptions.find(
          (option) => option.value === project.status
        );

        const projectIcon = projectIcons.find((item) => item.value === project.projectIcon);

        const progress = Math.min(100, Math.max(0, project.progress ?? 0));

        const progressColor =
          projectIcon?.color
            .split(' ')
            .find((color) => color.startsWith('bg-'))
            ?.replace('/10', '') ?? 'bg-primary';

        return (
          <ListItem
            key={project.id}
            title={project.name}
            description={project.description}
            leading={
              <div
                className={cn(
                  'flex size-10 shrink-0 items-center justify-center rounded-lg',
                  projectIcon?.color ?? 'bg-primary/10 text-primary'
                )}
              >
                <TaskIcon icon={projectIcon?.icon ?? 'GlobeIcon'} size={20} />
              </div>
            }
            actions={
              <ActionMenu
                name={t('project.title')}
                isCompleted={project.status === 'completed'}
                onComplete={() => projectConfirmationModal(project, 'complete')}
                onEdit={() => onEditHandle(project)}
                onView={() => onViewHandle(project)}
                onDuplicate={() => projectConfirmationModal(project, 'duplicate')}
                onDelete={() => projectConfirmationModal(project, 'delete')}
              />
            }
          >
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant={projectStatusVariants[project.status]}>
                {selectedStatus?.labels ? t(selectedStatus.labels) : project.status}
              </Badge>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-3">
                <Typography variant="caption" className="text-text-muted font-sans">
                  {t('project.table.tasks', {
                    completeTasks: project.completedTasks,
                    totalTasks: project.totalTasks,
                  })}
                </Typography>

                <Typography variant="caption" className="text-text font-sans font-semibold">
                  {t('project.table.percent', { value: progress })}
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
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="border-border mt-4 flex flex-wrap items-center justify-between gap-3 border-t pt-3">
              <div className="flex items-center gap-2">
                <TaskIcon icon="CalendarBlankIcon" size={14} className="text-text-muted" />

                <Typography variant="caption" className="text-text-muted font-sans">
                  {formatDate(project.dueDate, { includeTime: false })}
                </Typography>
              </div>

              <div className="flex items-center gap-2">
                <TaskIcon icon="ClockIcon" size={14} className="text-text-muted" />

                <Typography variant="caption" className="text-text-muted font-sans">
                  {formatDate(project.lastUpdated, { includeTime: true })}
                </Typography>
              </div>
            </div>
          </ListItem>
        );
      })}
    </div>
  );
}
