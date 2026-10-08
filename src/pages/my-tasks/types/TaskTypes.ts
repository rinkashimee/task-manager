export type FilterType = 'all' | 'todo' | 'in-progress' | 'completed' | 'overdue';

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
