import { useTranslation } from 'react-i18next';
import type { DashboardStatsTypes } from '../types/Dashboard.types';
import DashboardStatCard from './DashboardStatCard';
import DashboardStatSkeleton from './dashboard-skeleton/DashboardStatSkeleton';

interface DashboardStatsProps {
  isLoading?: boolean;
  data: DashboardStatsTypes;
}

export default function DashboardStats(props: DashboardStatsProps) {
  const { data, isLoading } = props;

  const { t } = useTranslation();

  if (isLoading || !data) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, index) => (
          <DashboardStatSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      <DashboardStatCard
        title={t('dashboard.dashboard-stat.total-tasks')}
        value={data.totalTasks}
        icon="ClipboardTextIcon"
        iconClassName="text-primary"
        backgroundClassName="bg-primary/10"
      />

      <DashboardStatCard
        title={t('dashboard.dashboard-stat.completed')}
        value={data.completedTasks}
        icon="CheckCircleIcon"
        iconClassName="text-success"
        backgroundClassName="bg-success/10"
      />

      <DashboardStatCard
        title={t('dashboard.dashboard-stat.in-progress')}
        value={data.inProgressTasks}
        icon="ClockIcon"
        iconClassName="text-info"
        backgroundClassName="bg-info/10"
      />

      <DashboardStatCard
        title={t('dashboard.dashboard-stat.overdue')}
        value={data.overdueTasks}
        icon="WarningCircleIcon"
        iconClassName="text-danger"
        backgroundClassName="bg-danger/10"
      />
    </div>
  );
}
