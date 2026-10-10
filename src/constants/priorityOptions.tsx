import type { DropdownOption } from '@/components/ui/Dropdown/Dropdown.types';

export const priorityOptions: DropdownOption[] = [
  {
    labels: 'common.priority-dropdown.low',
    value: 'low',
    icon: <span className="bg-success size-2.5 rounded-full" />,
  },
  {
    labels: 'common.priority-dropdown.medium',
    value: 'medium',
    icon: <span className="bg-warning size-2.5 rounded-full" />,
  },
  {
    labels: 'common.priority-dropdown.high',
    value: 'high',
    icon: <span className="bg-danger size-2.5 rounded-full" />,
  },
];
