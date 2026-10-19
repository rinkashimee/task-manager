import { NavLink, useLocation } from 'react-router-dom';
import type { IconType } from '../../icons/TaskIcon';
import clsx from 'clsx';
import TaskIcon from '../../icons/TaskIcon';
import Typography from '../../ui/Typography/Typography';
import type { ParseKeys } from 'i18next';
import { useTranslation } from 'react-i18next';

interface SidebarItemProps {
  label: ParseKeys;
  icon: IconType;
  path: string;
  onClick?: () => void;
}

export default function SidebarItems(props: SidebarItemProps) {
  const { label, icon, path, onClick } = props;

  const { t } = useTranslation();
  const { pathname } = useLocation();

  const isActive = pathname === path || pathname.startsWith(`${path}/`);

  return (
    <NavLink
      to={path}
      title={t(label)}
      aria-label={t(label)}
      onClick={onClick}
      className={clsx(
        'flex items-center justify-start gap-2 rounded-md px-4 py-2.5 transition-colors',
        'md:justify-center md:px-2',
        'xl:justify-start xl:px-4',
        isActive ? 'bg-primary text-inverse' : 'hover:bg-primary'
      )}
    >
      <TaskIcon
        size={20}
        icon={icon}
        className="text-text-inverse"
        weight={isActive ? 'fill' : 'regular'}
      />

      <Typography
        variant="body-sm"
        className="text-text-inverse font-sans whitespace-nowrap md:hidden xl:block"
      >
        {t(label)}
      </Typography>
    </NavLink>
  );
}
