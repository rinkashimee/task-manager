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
}

export default function SidebarItems(props: SidebarItemProps) {
  const { label, icon, path } = props;

  const { t } = useTranslation();
  const { pathname } = useLocation();

  const isActive = pathname === path;

  return (
    <NavLink
      to={path}
      className={clsx(
        'flex items-center gap-2 rounded-md px-4 py-2.5 transition-colors',
        isActive ? 'bg-primary text-inverse' : 'hover:bg-primary'
      )}
    >
      <TaskIcon
        size={20}
        icon={icon}
        color="var(--text-inverse)"
        weight={isActive ? 'fill' : 'regular'}
      />

      <Typography variant="body-sm" className="text-text-inverse font-sans">
        {t(label)}
      </Typography>
    </NavLink>
  );
}
