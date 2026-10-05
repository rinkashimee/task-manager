import type { Icon } from '@phosphor-icons/react';
import {
  CheckSquareIcon,
  FolderIcon,
  GearIcon,
  HouseLineIcon,
  MagicWandIcon,
} from '@phosphor-icons/react';

const icons = {
  HouseLineIcon,
  CheckSquareIcon,
  FolderIcon,
  GearIcon,
  MagicWandIcon,
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
