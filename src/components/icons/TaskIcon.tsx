import type { Icon } from '@phosphor-icons/react';
import {
  BookmarkSimpleIcon,
  CalendarDotsIcon,
  CaretDownIcon,
  CaretLeftIcon,
  CaretRightIcon,
  ChartBarIcon,
  CheckCircleIcon,
  CheckIcon,
  CheckSquareIcon,
  ClipboardTextIcon,
  CodeIcon,
  CopyIcon,
  DotsThreeIcon,
  EyeIcon,
  FlagIcon,
  FolderIcon,
  FolderOpenIcon,
  GearIcon,
  GlobeIcon,
  HouseLineIcon,
  InfoIcon,
  ListChecksIcon,
  MagicWandIcon,
  MagnifyingGlassIcon,
  MegaphoneIcon,
  PaletteIcon,
  PencilIcon,
  PencilSimpleIcon,
  PlusIcon,
  SignOutIcon,
  StackIcon,
  TrashIcon,
  UserCircleIcon,
  WarningIcon,
  XCircleIcon,
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
  XCircleIcon,
  GlobeIcon,
  CodeIcon,
  BookmarkSimpleIcon,
  MegaphoneIcon,
  StackIcon,
  ChartBarIcon,
  FolderOpenIcon,
  EyeIcon,
  ListChecksIcon,
  FlagIcon,
  PencilSimpleIcon,
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
