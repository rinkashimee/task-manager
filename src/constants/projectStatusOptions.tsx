import type { DropdownOption } from '@/components/ui/Dropdown/Dropdown.types';

export const projectStatusOptions: DropdownOption[] = [
  {
    labels: 'common.status-dropdown.not-started',
    value: 'not-started',
    icon: <span className="size-2.5 rounded-full border border-indigo-300 bg-indigo-100" />,
  },
  {
    labels: 'common.status-dropdown.in-progress',
    value: 'in-progress',
    icon: <span className="bg-info size-2.5 rounded-full" />,
  },
  {
    labels: 'common.status-dropdown.completed',
    value: 'completed',
    icon: <span className="bg-success size-2.5 rounded-full" />,
  },
  {
    labels: 'common.status-dropdown.on-hold',
    value: 'on-hold',
    icon: <span className="bg-danger size-2.5 rounded-full" />,
  },
];
