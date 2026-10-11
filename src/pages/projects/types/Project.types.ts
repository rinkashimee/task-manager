import type { ConfirmationVariant } from '@/components/ui/ConfirmationModal';
import type { FormSubmitEvent } from '@/components/ui/Form/Form.types';
import type { HandleTypes } from '@/constants/commonContants';
import type { TaskResponse } from '@/pages/my-tasks/types/Task.types';

export type ProjectFormMode = 'create' | 'edit';

export interface ProjectTypes {
  id: string;
  name: string;
  description: string;
  status: string;
  dueDate: string;
  projectIcon: string;

  totalTasks: number;
  completedTasks: number;
  progress: number;

  createdAt: string;
  lastUpdated: string;
  tasks?: TaskResponse[];
}

export type ProjectFormValues = Omit<
  ProjectTypes,
  'id' | 'totalTasks' | 'completedTasks' | 'progress' | 'lastUpdated' | 'createdAt' | 'tasks'
>;

export interface ProjectRequest extends Omit<
  ProjectTypes,
  | 'id'
  | 'dueDate'
  | 'totalTasks'
  | 'completedTasks'
  | 'progress'
  | 'lastUpdated'
  | 'createdAt'
  | 'tasks'
> {
  dueDate: string | null;
}

export interface ProjectQueryParams {
  page: number;
  size: number;
  search?: string;
}

export interface ProjectResponse extends Omit<
  ProjectTypes,
  'dueDate' | 'lastUpdated' | 'createdAt' | 'tasks'
> {
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectDetailsResponse {
  project: ProjectResponse;
  tasks: TaskResponse[];
}

export interface ProjectPageResponse {
  content: ProjectResponse[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

export interface UseProjectsParams {
  currentPage: number;
  pageSize: number;
  search: string;
}

export type ProjectLoadingState = {
  fetch: boolean;
  fetchProject: boolean;
  fetchDetails: boolean;
  create: boolean;
  update: boolean;
  delete: boolean;
};

export interface ProjectConfirmationState {
  task: ProjectTypes;
  handleType: HandleTypes;
}

export type ProjectConfirmationConfig = {
  title: string;
  description: string;
  variant: ConfirmationVariant;
  confirmText: string;
};

export interface ProjectFormProps {
  mode?: 'create' | 'edit';
  initialValues?: ProjectTypes;
  isSubmitting?: boolean;
  onClose: (open: boolean) => void;
  handleSubmit: (values: ProjectFormValues, event: FormSubmitEvent) => void;
}

export interface ProjectTableProps {
  total: number;
  pageSize: number;
  currentPage: number;
  isFetching: boolean;
  isConfirmation: boolean;
  data: ProjectTypes[];
  createTask: (data: ProjectRequest, successMessage?: string) => Promise<boolean>;
  updateProject: (id: string, values: ProjectRequest, successMessage?: string) => Promise<boolean>;
  getProjectDetailsById: (id: string) => Promise<ProjectTypes | null>;
  deleteProject: (id: string) => Promise<boolean>;
  handleEditTask: (data: ProjectTypes) => void;
  setCurrentPage: (page: number) => void;
}
