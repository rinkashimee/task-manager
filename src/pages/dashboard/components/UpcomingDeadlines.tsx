import Button from '@/components/ui/Button/Button';
import Typography from '@/components/ui/Typography/Typography';
import type { TaskTypes } from '@/pages/my-tasks/types/Task.types';
import UpcomingDeadlineItem from './UpcomingDeadlineItem';
import { useTranslation } from 'react-i18next';
import type { DropdownOption } from '@/components/ui/Dropdown/Dropdown.types';
import TaskIcon from '@/components/icons/TaskIcon';
import UpcomingDeadlinesSkeleton from './dashboard-skeleton/UpcomingDeadlinesSkeleton';
import UpcomingTaskLists from './UpcomingTaskLists';
import { useMemo, useState } from 'react';
import { useToast } from '@/components/ui/Toast/ToastProvider';
import Modal from '@/components/ui/Modal/Modal';
import TaskViewHeader from '@/pages/my-tasks/components/TaskViewHeader';
import TaskView from '@/pages/my-tasks/components/TaskView';
import { cn } from '@/lib/utils/utils';

interface UpcomingDeadlinesProps {
  tasks: TaskTypes[];
  isLoading?: boolean;
  totalItems: number;
  currentPage: number;
  allDeadlines: TaskTypes[];
  isFetchAllDeadline: boolean;
  projectDropdown: DropdownOption[];
  setCurrentPage: (values: number) => void;
  getTaskById: (id: string) => Promise<TaskTypes | null>;
  fetchAllUpcomingDeadlines: () => Promise<void>;
}

export default function UpcomingDeadlines(props: UpcomingDeadlinesProps) {
  const {
    tasks,
    isLoading = false,
    currentPage,
    totalItems,
    allDeadlines,
    projectDropdown,
    isFetchAllDeadline,
    setCurrentPage,
    getTaskById,
    fetchAllUpcomingDeadlines,
  } = props;

  const { t } = useTranslation();
  const { showToast } = useToast();

  const [viewAllTasks, setViewAllTasks] = useState<boolean>(false);
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

  const viewAllHandle = async () => {
    setViewAllTasks(true);
    await fetchAllUpcomingDeadlines();
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    await fetchAllUpcomingDeadlines();
  };

  const upcomingDeadlineItems = useMemo(
    () =>
      tasks.map((task) => (
        <UpcomingDeadlineItem
          key={task.id}
          task={task}
          projectDropdown={projectDropdown}
          handView={() => handleView(task)}
        />
      )),
    [tasks, projectDropdown, handleView]
  );

  return (
    <div className="border-border bg-card flex h-auto min-h-[220px] flex-col rounded-md border px-2 lg:h-[365px]">
      <div className="border-border flex shrink-0 items-center justify-between border-b px-2 py-2">
        <Typography variant="body-sm" className="text-text font-semibold">
          {t('dashboard.upcoming-deadline')}
        </Typography>

        <Button
          variant="ghost"
          className="text-text hover:text-primary h-8 gap-2 px-2.5 font-sans"
          onClick={viewAllHandle}
        >
          <Typography as="p" variant="caption" className="truncate !font-semibold">
            {t('common.viewAll')}
          </Typography>

          <TaskIcon icon="CaretRightIcon" size={14} />
        </Button>
      </div>

      <div
        className={cn(
          'min-h-0 flex-1',
          'overflow-y-auto',
          '[scrollbar-width:none]',
          '[&::-webkit-scrollbar]:hidden'
        )}
      >
        {isLoading ? (
          <UpcomingDeadlinesSkeleton data={tasks} />
        ) : tasks.length > 0 ? (
          <div className="flex flex-col">{upcomingDeadlineItems}</div>
        ) : (
          <div className="flex min-h-[160px] flex-col items-center justify-center gap-2 lg:h-full lg:min-h-0">
            <div className="bg-primary/10 flex size-11 items-center justify-center rounded-full">
              <TaskIcon icon="CalendarXIcon" size={22} className="text-primary" />
            </div>

            <div className="flex flex-col items-center gap-1">
              <Typography variant="body-sm" className="text-text font-semibold">
                {t('dashboard.no-deadline')}
              </Typography>

              <Typography variant="caption" className="text-text-muted text-center">
                {t('dashboard.deadline-desc')}
              </Typography>
            </div>
          </div>
        )}
      </div>

      <UpcomingTaskLists
        totalItems={totalItems}
        currentPage={currentPage}
        viewAllTasks={viewAllTasks}
        isLoading={isFetchAllDeadline}
        allDeadlineTasks={allDeadlines}
        projectDropdown={projectDropdown}
        handView={handleView}
        handlePageChange={handlePageChange}
        onClose={() => setViewAllTasks(false)}
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
