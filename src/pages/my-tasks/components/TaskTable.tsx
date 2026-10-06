import Card from '@/components/ui/Cards/Card';
import Table from '@/components/ui/Table/Table';
import taskTableColumns from './TaskTableColumn';

export default function TaskTable() {
  return (
    <Card className="flex min-h-0 flex-1 flex-col p-3">
      <Table
        tableWrapperClassName="min-h-0 flex-1"
        rowKey={(id) => id.id}
        columns={taskTableColumns()}
        data={[]}
        // pagination={{ //TODO:
        //   current: currentPage,
        //   pageSize: pageSize,
        //   total: filteredFileData.length,
        //   resourceName: t('settings.file-breakdown.files'),
        //   onChange: setCurrentPage,
        // }}
      />
    </Card>
  );
}
