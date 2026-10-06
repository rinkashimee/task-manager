import type { TableColumn } from '@/components/ui/Table/Table';
import type { TaskTableTypes } from '../types/TaskTypes';
import { useTranslation } from 'react-i18next';

export default function taskTableColumns(): TableColumn<TaskTableTypes>[] {
  const { t } = useTranslation();

  return [
    {
      key: 'task',
      title: t('my-tasks.table.task'),
      //   width: 300 TODO:,
      dataIndex: 'task',
      render: () => {},
    },
    {
      key: 'project',
      title: t('my-tasks.table.project'),
      //   width: 300,
      dataIndex: 'project',
      render: () => {},
    },
    {
      key: 'priority',
      title: t('my-tasks.table.priority'),
      //   width: 300,
      dataIndex: 'priority',
      render: () => {},
    },
    {
      key: 'status',
      title: t('my-tasks.table.status'),
      //   width: 300,
      dataIndex: 'status',
      render: () => {},
    },
    {
      key: 'dueDate',
      title: t('my-tasks.table.due-date'),
      //   width: 300,
      dataIndex: 'dueDate',
      render: () => {},
    },
    {
      key: 'action',
      title: '',
      //   width: 300,
      render: () => {},
    },
  ];
}
