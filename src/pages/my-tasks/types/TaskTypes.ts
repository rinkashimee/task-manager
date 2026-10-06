export type FilterType = 'all' | 'todo' | 'in-progress' | 'completed' | 'overdue';

export interface TaskTableTypes {
  id: string;
  task: string;
  project: string;
  priority: string;
  status: string;
  dueDate: string;
}
