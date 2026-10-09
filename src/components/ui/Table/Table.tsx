import { cn } from '@/lib/utils/utils';
import type { ReactNode } from 'react';
import TableEmptyState from './TableEmptyState';
import TablePagination from './TablePagination';

export interface TableColumn<T> {
  key: string;
  title: ReactNode;
  dataIndex?: keyof T;
  width?: number | string;
  align?: 'left' | 'center' | 'right';
  render?: (value: T[keyof T] | undefined, record: T, index: number) => ReactNode;
}

export interface TablePaginationTypes {
  current: number;
  pageSize: number;
  total: number;
  resourceName?: string;
  onChange?: (page: number) => void;
}

interface TableProps<T> {
  rowKey: keyof T | ((record: T) => React.Key);
  columns: TableColumn<T>[];
  data: T[];
  pagination?: false | TablePaginationTypes;
  tableWrapperClassName?: string;
}

export default function Table<T>(props: TableProps<T>) {
  const { rowKey, columns, data, pagination, tableWrapperClassName } = props;

  return (
    <div className={cn('bg-card flex flex-col overflow-hidden', tableWrapperClassName)}>
      <div
        className={cn(
          'relative flex-1 overflow-auto',
          '[scrollbar-width:auto]',
          '[&::-webkit-scrollbar]:h-[6px]',
          '[&::-webkit-scrollbar]:w-0',
          '[&::-webkit-scrollbar-thumb]:rounded-full',
          '[&::-webkit-scrollbar-thumb]:bg-black/30',
          '[&::-webkit-scrollbar-track]:bg-transparent'
        )}
      >
        <table className="w-max min-w-full border-collapse">
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width }}
                  className={cn(
                    'bg-canvas text-text border-border sticky top-0 z-10 border-b px-5 py-3 text-left font-sans text-xs font-semibold',
                    {
                      'text-center': column.align === 'center',
                      'text-right': column.align === 'right',
                    }
                  )}
                >
                  {column.title}
                </th>
              ))}
            </tr>
          </thead>
          {data?.length > 0 && (
            <tbody>
              {data.map((record, rowIndex) => {
                const key = typeof rowKey === 'function' ? rowKey(record) : record[rowKey];
                // hover: bg - neutral - 50;
                return (
                  <tr key={String(key)} className="border-border border-b transition">
                    {columns.map((column) => {
                      const value = column.dataIndex ? record[column.dataIndex] : undefined;

                      return (
                        <td
                          key={column.key}
                          className={cn('p-4', {
                            'text-center': column.align === 'center',
                            'text-right': column.align === 'right',
                          })}
                        >
                          {column.render
                            ? column.render(value, record, rowIndex)
                            : String(value ?? '')}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          )}
        </table>

        {data?.length === 0 && <TableEmptyState />}
      </div>

      {pagination && <TablePagination {...pagination} />}
    </div>
  );
}
