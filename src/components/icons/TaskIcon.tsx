import type { Icon } from '@phosphor-icons/react';
import {
  CalendarDotsIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  CheckCircleIcon,
  CheckIcon,
  CheckSquareIcon,
  ClipboardTextIcon,
  CopyIcon,
  DotsThreeIcon,
  FolderIcon,
  GearIcon,
  HouseLineIcon,
  InfoIcon,
  MagicWandIcon,
  MagnifyingGlassIcon,
  PaletteIcon,
  PencilIcon,
  PlusIcon,
  SignOutIcon,
  TrashIcon,
  UserCircleIcon,
  WarningIcon,
  XIcon,
} from '@phosphor-icons/react';

const icons = {
  HouseLineIcon,
  CheckSquareIcon,
  FolderIcon,
  GearIcon,
  MagicWandIcon,
  CaretDownIcon,
  UserCircleIcon,
  PaletteIcon,
  SignOutIcon,
  InfoIcon,
  MagnifyingGlassIcon,
  PlusIcon,
  ClipboardTextIcon,
  XIcon,
  CheckIcon,
  CalendarDotsIcon,
  DotsThreeIcon,
  PencilIcon,
  CopyIcon,
  TrashIcon,
  WarningIcon,
  CheckCircleIcon,
  CaretLeftIcon,
  CaretRightIcon,
} satisfies Record<string, Icon>;

export type IconType = keyof typeof icons;

interface TaskIconProps {
  icon: IconType;
  size?: number | string;
  color?: string;
  weight?: React.ComponentProps<Icon>['weight'];
  className?: string;
}

export default function TaskIcon(props: TaskIconProps) {
  const { icon, size = 20, color, weight = 'regular', className } = props;

  const IconComponent = icons[icon];

  return <IconComponent size={size} color={color} weight={weight} className={className} />;
}
