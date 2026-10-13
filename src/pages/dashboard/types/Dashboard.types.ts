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
  fetchProjectProgress: boolean;
  fetchRecentTasks: boolean;
};

export interface DashboardQueryParams {
  page: number;
  size: number;
}

export interface UseDashboardParams {
  currentPage: number;
  pageSize: number;
}

export interface ProjectProgressTypes {
  id: string;
  name: string;
  projectIcon: string;
  totalTasks: number;
  completedTasks: number;
  progress: number;
}
