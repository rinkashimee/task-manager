import TaskIcon from '@/components/icons/TaskIcon';
import Button from '@/components/ui/Button/Button';
import Typography from '@/components/ui/Typography/Typography';
import UserAvatar from './UserAvatar';
import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import UserDropdownHeader from './UserDropdownHeader';
import UserMenuItem from './UserMenuItem';
import { cn } from '@/lib/utils/utils';
import { useTranslation } from 'react-i18next';

interface UserMenuProps {
  name: string;
  email: string;
  avatarUrl?: string | null;
}

export default function UserMenu(props: UserMenuProps) {
  const { name, email, avatarUrl } = props;

  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative">
      <Button
        type="button"
        variant="ghost"
        className="gap-3 px-4 py-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <UserAvatar name={name} avatarUrl={avatarUrl} />

        <Typography variant="body-sm" className="font-sans">
          {name}
        </Typography>

        <TaskIcon
          icon="CaretDownIcon"
          size={14}
          className={clsx('transition-transform', isOpen && 'rotate-180')}
        />
      </Button>

      {isOpen && (
        <div
          className={cn(
            'border-border bg-card absolute',
            'top-full right-0 z-50 w-[240px] rounded-md border p-3 shadow-sm'
          )}
        >
          <UserDropdownHeader name={name} email={email} avatarUrl={avatarUrl} />

          <div className="border-border my-2 border-t" />

          <UserMenuItem icon="UserCircleIcon" label={t('common.account')} />

          <UserMenuItem icon="PaletteIcon" label={t('common.appearance')} classname="mt-1" />

          <div className="border-border my-2 border-t" />

          <UserMenuItem icon="InfoIcon" label={t('common.about')} />

          <div className="border-border my-2 border-t" />

          <UserMenuItem icon="SignOutIcon" label={t('common.logout')} danger />
        </div>
      )}
    </div>
  );
}
