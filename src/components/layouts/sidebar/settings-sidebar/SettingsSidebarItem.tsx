import TaskIcon, { type IconType } from '@/components/icons/TaskIcon';
import Typography from '@/components/ui/Typography/Typography';
import { cn } from '@/lib/utils/utils';
import type { ParseKeys } from 'i18next';
import { useTranslation } from 'react-i18next';
import { NavLink, useMatch } from 'react-router-dom';

interface SettingsSidebarItemProps {
  labelKey: ParseKeys;
  icon: IconType;
  path: string;
  description: ParseKeys;
}

export default function SettingsSidebarItem(props: SettingsSidebarItemProps) {
  const { labelKey, icon, path, description } = props;

  const { t } = useTranslation();

  const isActive = useMatch(path);

  return (
    <NavLink
      to={path}
      className={cn(
        'flex shrink-0 items-center gap-3 rounded-md px-3 py-3 whitespace-nowrap transition-colors',
        'lg:w-full',
        isActive
          ? 'bg-primary/10 text-primary'
          : 'text-text-muted hover:bg-primary/5 hover:text-primary'
      )}
    >
      <TaskIcon
        icon={icon}
        size={18}
        weight="bold"
        className={cn(isActive ? 'text-primary' : 'text-text')}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <Typography
          variant="caption"
          className={cn('font-semibold', isActive ? 'text-primary' : 'text-text')}
        >
          {t(labelKey)}
        </Typography>

        <Typography variant="caption" className="text-text-muted hidden sm:block">
          {t(description)}
        </Typography>
      </div>

      <TaskIcon
        icon="CaretRightIcon"
        size={14}
        className={cn('hidden lg:block', isActive ? 'text-primary' : 'text-text-muted')}
      />
    </NavLink>
  );
}
