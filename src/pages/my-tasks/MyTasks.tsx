import TaskIcon from '@/components/icons/TaskIcon';
import Header from '@/components/layouts/header/Header';
import Button from '@/components/ui/Button/Button';
import Input from '@/components/ui/Input/Input';
import Typography from '@/components/ui/Typography/Typography';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import TaskFilter from './components/TaskFilter';
import TaskTable from './components/TaskTable';
import type { FilterType } from './types/TaskTypes';

export default function MyTasks() {
  const { t } = useTranslation();

  const [filter, setFilter] = useState<FilterType>('all');

  return (
    <div className="flex h-full min-h-0 flex-col">
      <Header title={t('my-tasks.title')} caption={t('my-tasks.caption')} />

      <div className="flex shrink-0 items-center justify-between gap-6 p-6">
        <Input
          type="text"
          placeholder={t('common.search-tasks')}
          icon="MagnifyingGlassIcon"
          wrapperClassName="w-full max-w-[400px]"
        />

        <Button type="button" variant="primary" className="h-9 gap-2 px-4 font-sans">
          <TaskIcon size={16} icon="PlusIcon" />

          <Typography as="p" variant="caption" className="truncate">
            {t('common.add-tasks')}
          </Typography>
        </Button>
      </div>

      <div className="mb-6 flex min-h-0 flex-1 flex-col gap-4 px-6">
        <TaskFilter value={filter} onChange={setFilter} />

        <TaskTable />
      </div>
    </div>
  );
}
