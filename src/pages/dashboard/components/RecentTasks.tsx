import TaskIcon from '@/components/icons/TaskIcon';
import Button from '@/components/ui/Button/Button';
import Table from '@/components/ui/Table/Table';
import Typography from '@/components/ui/Typography/Typography';
import type { TaskTypes } from '@/pages/my-tasks/types/Task.types';
import { useTranslation } from 'react-i18next';
import recentTaskColumns from './RecentTaskColumns';
import type { DropdownOption } from '@/components/ui/Dropdown/Dropdown.types';
import { useState } from 'react';
import Modal from '@/components/ui/Modal/Modal';
import TaskView from '@/pages/my-tasks/components/TaskView';
import TaskViewHeader from '@/pages/my-tasks/components/TaskViewHeader';
import { useToast } from '@/components/ui/Toast/ToastProvider';
import { cn } from '@/lib/utils/utils';

interface RecentTasksProps {
  tasks: TaskTypes[];
  loading: boolean;
  projectDropdown: DropdownOption[];
  onViewAll: () => void;
  getTaskById: (id: string) => Promise<TaskTypes | null>;
}

export default function RecentTasks(props: RecentTasksProps) {
  const { tasks, loading, projectDropdown, getTaskById, onViewAll } = props;

  const { t } = useTranslation();
  const { showToast } = useToast();

  const [viewTaskData, setViewTaskData] = useState<TaskTypes | null>(null);

  const handleView = async (task: TaskTypes) => {
    const latestTask = await getTaskById(task.id);

    if (!latestTask) {
      showToast({
        title: t('common.toast-title.fail'),
        description: t('common.not-found'),
        variant: 'error',
      });
      return;
    }

    setViewTaskData(latestTask);
  };

  return (
    <div
      className={cn(
        'bg-card border-border flex min-h-[280px] shrink-0 flex-col rounded-md border px-5',
        'xl:min-h-0 xl:flex-1 xl:shrink'
      )}
    >
      <div className="border-border flex shrink-0 items-center justify-between gap-4 border-b py-2">
        <Typography variant="body-sm" className="text-text font-semibold">
          {t('dashboard.recent-tasks')}
        </Typography>

        <Button
          variant="ghost"
          className="text-text hover:text-primary h-8 gap-2 px-2.5 font-sans"
          onClick={onViewAll}
        >
          <Typography as="p" variant="caption" className="truncate !font-semibold">
            {t('common.viewAll')}
          </Typography>

          <TaskIcon icon="CaretRightIcon" size={14} />
        </Button>
      </div>

      <Table
        hideHeader
        tableWrapperClassName="min-h-[220px] flex-1 xl:min-h-0"
        rowKey={(id) => id.id}
        columns={recentTaskColumns({
          projectDropdown,
          onViewHandle: handleView,
        })}
        data={tasks}
        isLoading={loading}
        skeletonRows={15}
        emptyTitle={t('common.no-tasks')}
        emptyDesc={t('common.task-caption')}
      />

      {viewTaskData && (
        <Modal
          open={viewTaskData !== null}
          onClose={() => setViewTaskData(null)}
          size="lg"
          title={viewTaskData.title}
          headerVariant="view"
          headerContent={<TaskViewHeader viewTask={viewTaskData} />}
        >
          <TaskView
            deadlineView
            task={viewTaskData}
            projectDropdown={projectDropdown}
            onEdit={() => {
              setViewTaskData(null);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
