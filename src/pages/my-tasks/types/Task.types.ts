import type { ConfirmationVariant } from '@/components/ui/ConfirmationModal';
import type { DropdownOption } from '@/components/ui/Dropdown/Dropdown.types';
import type { HandleTypes } from '@/constants/commonContants';

export type FilterType = 'all' | 'todo' | 'in-progress' | 'completed' | 'overdue';

export type TaskFormMode = 'create' | 'edit';

export interface TaskTypes {
  id: string;
  title: string;
  description: string;
  projectId: string;
  priority: string;
  status: string;
  dueDate: string;
}

export type TaskFormValues = Omit<TaskTypes, 'id'>;

export interface TaskConfirmationState {
  task: TaskTypes;
  handleType: HandleTypes;
}

export interface TaskResponse extends Omit<TaskTypes, 'dueDate'> {
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TaskQueryParams {
  page: number;
  size: number;
  search?: string;
  status?: FilterType;
}

export interface TaskPageResponse {
  content: TaskResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface TaskRequest extends Omit<TaskTypes, 'id' | 'dueDate'> {
  dueDate: string | null;
}

export interface ProjectOptionResponse {
  id: string;
  name: string;
}

export type TaskLoadingState = {
  fetch: boolean;
  fetchTask: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
};

export interface UseTasksParams {
  currentPage: number;
  pageSize: number;
  search: string;
  filter: FilterType;
}

export interface TaskTableProps {
  total: number;
  pageSize: number;
  currentPage: number;
  isFetching: boolean;
  data: TaskTypes[];
  projectDropdown: DropdownOption[];
  createTask: (data: TaskRequest, successMessage?: string) => Promise<boolean>;
  updateTask: (id: string, values: TaskRequest, successMessage?: string) => Promise<boolean>;
  deleteTask: (id: string) => Promise<boolean>;
  handleEditTask: (data: TaskTypes) => void;
  setCurrentPage: (page: number) => void;
}

export type TaskConfirmationConfig = {
  title: string;
  description: string;
  variant: ConfirmationVariant;
  confirmText: string;
};
