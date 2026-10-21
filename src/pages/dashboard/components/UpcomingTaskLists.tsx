import TaskIcon from '@/components/icons/TaskIcon';
import Modal from '@/components/ui/Modal/Modal';
import Typography from '@/components/ui/Typography/Typography';
import type { TaskTypes } from '@/pages/my-tasks/types/Task.types';
import UpcomingDeadlineItem from './UpcomingDeadlineItem';
import TablePagination from '@/components/ui/Table/TablePagination';
import { pageSize } from '@/pages/my-tasks/constant/TaskConstant';
import { useTranslation } from 'react-i18next';
import type { DropdownOption } from '@/components/ui/Dropdown/Dropdown.types';
import UpcomingDeadlinesSkeleton from './dashboard-skeleton/UpcomingDeadlinesSkeleton';
import { cn } from '@/lib/utils/utils';

interface UpcomingTaskListsProps {
  allDeadlineTasks: TaskTypes[];
  currentPage: number;
  totalItems: number;
  isLoading: boolean;
  viewAllTasks: boolean;
  projectDropdown: DropdownOption[];
  onClose: () => void;
  handView: (task: TaskTypes) => void;
  handlePageChange: (values: number) => void;
}

export default function UpcomingTaskLists(props: UpcomingTaskListsProps) {
  const {
    isLoading,
    totalItems,
    currentPage,
    projectDropdown,
    allDeadlineTasks,
    viewAllTasks,
    onClose,
    handView,
    handlePageChange,
  } = props;

  const { t } = useTranslation();

  const today = new Date();

  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));

  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);

  const formatDate = (date: Date) =>
    date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

  return (
    <Modal
      size="xl"
      height="h-[90dvh] sm:h-[80dvh]"
      open={viewAllTasks}
      onClose={onClose}
      title={t('dashboard.upcoming-all-task.title')}
      caption={t('dashboard.upcoming-all-task.desc')}
    >
      <div className="flex h-full min-h-0 flex-col px-3 py-3 sm:px-4">
        <div className="bg-primary/5 flex items-center justify-between gap-3 rounded-lg px-3 py-3 sm:px-4">
          <div className="flex items-center gap-4">
            <div className="bg-primary/10 flex size-11 items-center justify-center rounded-lg">
              <TaskIcon icon="CalendarIcon" size={24} className="text-primary" />
            </div>

            <div className="flex flex-col gap-1">
              <Typography variant="body-sm" className="text-text font-semibold">
                {t('dashboard.this-week')}
              </Typography>

              <Typography variant="caption" className="text-text-muted">
                {formatDate(monday)} – {formatDate(sunday)}, {sunday.getFullYear()}
              </Typography>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1">
            <Typography variant="body-sm" className="text-text !font-bold">
              {totalItems}
            </Typography>

            <Typography variant="caption" className="text-text-muted">
              {t('my-tasks.name-s')?.toLowerCase()}
            </Typography>
          </div>
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
            <UpcomingDeadlinesSkeleton data={allDeadlineTasks} />
          ) : allDeadlineTasks.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center gap-2">
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
          ) : (
            allDeadlineTasks.map((task) => (
              <UpcomingDeadlineItem
                key={task.id}
                task={task}
                projectDropdown={projectDropdown}
                handView={() => handView(task)}
              />
            ))
          )}
        </div>

        <div className="border-border mt-auto w-full shrink-0 border-t">
          <TablePagination
            pageSize={pageSize}
            current={currentPage}
            total={totalItems}
            onChange={handlePageChange}
            resourceName={t('my-tasks.name-s')}
          />
        </div>
      </div>
    </Modal>
  );
}
