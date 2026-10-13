export interface DashboardStatsTypes {
  totalTasks: number;
  completedTasks: number;
  inProgressTasks: number;
  overdueTasks: number;
}

export type DashboardLoadingState = {
  fetch: boolean;
  fetchStat: boolean;
  fetchDeadline: boolean;
  fetchAllDeadline: boolean;
  fetchTask: boolean;
};

export interface DashboardQueryParams {
  page: number;
  size: number;
}

export interface UseDashboardParams {
  currentPage: number;
  pageSize: number;
}
