import type { HandleTypes } from '@/constants/commonContants';

export type FilterType = 'all' | 'todo' | 'in-progress' | 'completed' | 'overdue';

export type TaskFormMode = 'create' | 'edit';

export interface TaskTypes {
  id: string;
  title: string;
  description: string;
  project: string;
  priority: string;
  status: string;
  dueDate: string;
}

export type TaskFormValues = Omit<TaskTypes, 'id'>;

export interface ConfirmationState {
  task: TaskTypes;
  handleType: HandleTypes;
}
