import Header from '@/components/layouts/header/Header';
import { getGreeting } from '@/lib/utils/utils';
import { useTranslation } from 'react-i18next';
import DashboardStats from './components/DashboardStats';
import { useDashboard } from './hooks/useDashboard';
import { useEffect, useState } from 'react';
import UpcomingDeadlines from './components/UpcomingDeadlines';
import { useNavigate } from 'react-router-dom';
import { pageSize } from '../my-tasks/constant/TaskConstant';

export default function Dashboard() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const greeting = getGreeting();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const {
    dashboardStat,
    isFetchStat,
    totalItems,
    upcomingDeadlines,
    allDeadlines,
    isFetchDeadline,
    isFetchAllDeadline,
    projectDropdown,
    fetchProjectDropdown,
    fetchDashboardStats,
    fetchUpcomingDeadlines,
    getTaskById,
    fetchAllUpcomingDeadlines,
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

  return (
    <>
      <Header
        title={t('dashboard.title', { data: t(greeting), user: 'Rinkaa' })}
        caption={t('dashboard.caption')}
      />

      <div className="flex flex-col gap-2 px-6 py-3">
        <DashboardStats data={dashboardStat} isLoading={isFetchStat} />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
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
        </div>
      </div>
    </>
  );
}
