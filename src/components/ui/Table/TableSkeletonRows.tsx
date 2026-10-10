import { cn } from '@/lib/utils/utils';
import type { TableColumn } from './Table';
import Skeleton from '../Skeleton/Skeleton';

interface TableSkeletonRowsProps<T> {
  columns: TableColumn<T>[];
  rows?: number;
}

export default function TableSkeletonRows<T>({ columns, rows = 5 }: TableSkeletonRowsProps<T>) {
  return (
    <>
      {Array.from({ length: rows }, (_, rowIndex) => (
        <tr key={rowIndex} className="border-border border-b">
          {columns.map((column) => (
            <td
              key={column.key}
              className={cn('p-4', {
                'text-center': column.align === 'center',
                'text-right': column.align === 'right',
              })}
            >
              <Skeleton
                className={cn('h-4 w-full', column.skeletonWidth ?? 'w-24', {
                  'mx-auto': column.align === 'center',
                  'ml-auto': column.align === 'right',
                })}
              />
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}
