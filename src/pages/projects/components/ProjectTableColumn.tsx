import type { TableColumn } from '@/components/ui/Table/Table';
import type { ProjectTypes } from '../types/Project.types';
import { useTranslation } from 'react-i18next';
import Typography from '@/components/ui/Typography/Typography';
import { projectStatusOptions } from '@/constants/projectStatusOptions';
import Badge from '@/components/ui/Badge/Badge';
import { projectIcons, projectStatusVariants } from '../constant/ProjectConstant';
import { cn, formatDate } from '@/lib/utils/utils';
import TaskIcon from '@/components/icons/TaskIcon';
import ActionMenu from '@/components/ui/Table/ActionMenu';
import type { HandleTypes } from '@/constants/commonContants';

interface ProjectTableColumnProps {
  onViewHandle: (task: ProjectTypes) => void;
  onEditHandle: (task: ProjectTypes) => void;
  projectConfirmationModal: (task: ProjectTypes, handleType: HandleTypes) => void;
}

export default function projectTableColumns(
  props: ProjectTableColumnProps
): TableColumn<ProjectTypes>[] {
  const { onViewHandle, onEditHandle, projectConfirmationModal } = props;

  const { t } = useTranslation();

  return [
    {
      key: 'name',
      title: t('project.table.name'),
      width: 450,
      dataIndex: 'name',
      skeletonWidth: 'w-48',
      render: (_, response) => {
        const projectIcon = projectIcons.find((item) => item.value === response.projectIcon);

        return (
          <div className="flex items-center gap-3">
            <div
              className={cn(
                'flex size-10 shrink-0 items-center justify-center rounded-lg',
                projectIcon?.color ?? 'bg-primary/10 text-primary'
              )}
            >
              <TaskIcon icon={projectIcon?.icon ?? 'GlobeIcon'} size={20} />
            </div>

            <div className="flex min-w-0 flex-col gap-1">
              <Typography variant="caption" className="font-sans font-semibold">
                {response.name}
              </Typography>

              <Typography variant="caption" className="text-text-muted font-sans">
                {response.description}
              </Typography>
            </div>
          </div>
        );
      },
    },
    {
      key: 'progress',
      title: t('project.table.progress'),
      dataIndex: 'progress',
      skeletonWidth: 'w-28',
      render: (_, response) => {
        const progress = Math.min(100, Math.max(0, response.progress ?? 0));

        return (
          <div className="flex min-w-28 flex-col gap-2">
            <div className="flex items-center justify-between">
              <Typography variant="caption" className="text-text-muted truncate">
                {t('project.table.tasks', {
                  completeTasks: response.completedTasks,
                  totalTasks: response.totalTasks,
                })}
              </Typography>

              <Typography variant="caption" className="truncate font-medium">
                {t('project.table.percent', { value: progress })}
              </Typography>
            </div>

            <div className="bg-primary/10 h-2 w-full overflow-hidden rounded-full">
              <div
                className="bg-primary h-full rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        );
      },
    },
    {
      key: 'status',
      title: t('project.table.status'),
      dataIndex: 'status',
      skeletonWidth: 'w-24',
      render: (_, response) => {
        const selectedPriority = projectStatusOptions.find(
          (option) => option.value === response.status
        );

        return (
          <Badge variant={projectStatusVariants[response.status]}>
            {selectedPriority?.labels ? t(selectedPriority.labels) : response.status}
          </Badge>
        );
      },
    },
    {
      key: 'dueDate',
      title: t('project.table.due-date'),
      dataIndex: 'dueDate',
      skeletonWidth: 'w-28',
      render: (_, reponse) => (
        <Typography variant="caption" className="text-text font-sans">
          {formatDate(reponse.dueDate, { includeTime: false })}
        </Typography>
      ),
    },

    {
      key: 'lastUpdated',
      title: t('project.table.last-updated'),
      dataIndex: 'lastUpdated',
      skeletonWidth: 'w-28',
      render: (_, reponse) => (
        <Typography variant="caption" className="text-text font-sans">
          {formatDate(reponse.lastUpdated, { includeTime: true })}
        </Typography>
      ),
    },
    {
      key: 'action',
      title: '',
      skeletonWidth: 'w-6',
      render: (_, response) => (
        <ActionMenu
          name={t('project.title')}
          isCompleted={response.status === 'completed'}
          onComplete={() => projectConfirmationModal(response, 'complete')}
          onEdit={() => onEditHandle(response)}
          onView={() => onViewHandle(response)}
          onDuplicate={() => projectConfirmationModal(response, 'duplicate')}
          onDelete={() => projectConfirmationModal(response, 'delete')}
        />
      ),
    },
  ];
}
