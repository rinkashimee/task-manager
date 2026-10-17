import Header from '@/components/layouts/header/Header';
import { getGreeting } from '@/lib/utils/utils';
import { useTranslation } from 'react-i18next';
import DashboardStats from './components/DashboardStats';
import { useDashboard } from './hooks/useDashboard';
import { useEffect, useState } from 'react';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import { useNavigate } from 'react-router-dom';
import { pageSize } from '../my-tasks/constant/TaskConstant';
import ProjectProgress from './components/ProjectProgress';
import RecentTasks from './components/RecentTasks';
import { useAuthSession } from '../auth/hooks/useAuthSession';

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const greeting = getGreeting();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const { user } = useAuthSession();

  const {
    dashboardStat,
    isFetchStat,
    totalItems,
    upcomingDeadlines,
    allDeadlines,
    projectProgress,
    recentTasks,
    isFetchDeadline,
    isFetchAllDeadline,
    isProjectProgress,
    isRecentTasks,
    projectDropdown,
    fetchProjectDropdown,
    fetchDashboardStats,
    fetchUpcomingDeadlines,
    getTaskById,
    fetchAllUpcomingDeadlines,
    fetchProjectProgress,
    fetchRecentTasks,
  } = useDashboard({ pageSize: pageSize, currentPage });

  // Fetch projects
  useEffect(() => {
    void fetchProjectDropdown();
  }, [fetchProjectDropdown]);

  // Fetch dashboard stat
  useEffect(() => {
    void fetchDashboardStats();
  }, [fetchDashboardStats]);

  // Fetch upcoming deadline tasks
  useEffect(() => {
    void fetchUpcomingDeadlines();
  }, [fetchUpcomingDeadlines]);

  // Fetch project progress
  useEffect(() => {
    void fetchProjectProgress();
  }, [fetchProjectProgress]);

  // Fetch recent tasks
  useEffect(() => {
    void fetchRecentTasks();
  }, [fetchRecentTasks]);

  return (
    <div className="flex h-screen flex-col">
      <Header
        title={t('dashboard.title', { data: t(greeting), user: user?.name ?? 'User' })}
        caption={t('dashboard.caption')}
      />

      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto px-6 py-3">
        <DashboardStats data={dashboardStat} isLoading={isFetchStat} />

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <UpcomingDeadlines
            totalItems={totalItems}
            currentPage={currentPage}
            tasks={upcomingDeadlines}
            allDeadlines={allDeadlines}
            isLoading={isFetchDeadline}
            projectDropdown={projectDropdown}
            isFetchAllDeadline={isFetchAllDeadline}
            getTaskById={getTaskById}
            setCurrentPage={setCurrentPage}
            fetchAllUpcomingDeadlines={fetchAllUpcomingDeadlines}
          />

          <ProjectProgress
            projects={projectProgress}
            isLoading={isProjectProgress}
            handView={() => navigate('/projects')}
          />
        </div>

        <RecentTasks
          tasks={recentTasks}
          loading={isRecentTasks}
          projectDropdown={projectDropdown}
          getTaskById={getTaskById}
          onViewAll={() => navigate('/my-tasks')}
        />
      </div>
    </div>
  );
}
