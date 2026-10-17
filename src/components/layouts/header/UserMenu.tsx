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
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/pages/auth/hooks/useAuth';
import ConfirmationModal from '@/components/ui/ConfirmationModal';

interface UserMenuProps {
  name: string | undefined;
  email: string | undefined;
  avatarUrl?: string | null;
}

export default function UserMenu(props: UserMenuProps) {
  const { name, email, avatarUrl } = props;

  const { logout, isLogout } = useAuth();

  const { t } = useTranslation();
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [confirmation, setConfirmation] = useState<boolean>(false);
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

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div ref={dropdownRef} className="relative">
      <Button
        type="button"
        variant="ghost"
        className="text-text gap-3 px-4 py-2"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <UserAvatar name={name} avatarUrl={avatarUrl} />

        <Typography variant="body-sm" className="font-sans font-semibold">
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
            'top-full right-0 z-50',
            'w-max max-w-[min(360px,calc(100vw-24px))] min-w-[240px]',
            'rounded-md border p-3 shadow-sm'
          )}
        >
          <UserDropdownHeader name={name} email={email} avatarUrl={avatarUrl} />

          <div className="border-border my-2 border-t" />

          <UserMenuItem
            icon="UserCircleIcon"
            label={t('common.account')}
            onClick={() => {
              navigate('/settings/account');
              setIsOpen(false);
            }}
          />

          <UserMenuItem
            icon="PaletteIcon"
            label={t('common.appearance')}
            classname="mt-1"
            onClick={() => {
              navigate('/settings/appearance');
              setIsOpen(false);
            }}
          />

          <div className="border-border my-2 border-t" />

          <UserMenuItem
            icon="InfoIcon"
            label={t('common.about')}
            onClick={() => {
              navigate('/settings/about');
              setIsOpen(false);
            }}
          />

          <div className="border-border my-2 border-t" />

          <UserMenuItem
            icon="SignOutIcon"
            label={t('common.logout')}
            disabled={isLogout}
            onClick={() => setConfirmation(true)}
            danger
          />
        </div>
      )}

      <ConfirmationModal
        open={confirmation}
        loading={isLogout}
        onClose={() => setConfirmation(false)}
        onConfirm={handleLogout}
        title={t('common.confirmation-config.logout')}
        description={t('common.confirmation-config.logout-desc')}
        variant="warning"
        confirmText={t('common.logout')}
      />
    </div>
  );
}
