import { settingsNavItems } from '@/config/settingsSidebar';
import SettingsSidebarItem from './SettingsSidebarItem';
import { cn } from '@/lib/utils/utils';

export default function SettingsSidebar() {
  return (
    <aside
      className={cn(
        'bg-card border-border w-full min-w-0 shrink-0 rounded-md border p-3',
        'lg:w-64'
      )}
    >
      <nav
        className={cn(
          'flex min-w-0 gap-2 overflow-x-auto overflow-y-hidden',
          '[scrollbar-width:none]',
          '[&::-webkit-scrollbar]:hidden',
          'lg:flex-col lg:overflow-visible'
        )}
      >
        {settingsNavItems.map((item, index) => (
          <SettingsSidebarItem
            key={index}
            labelKey={item.labelKey}
            icon={item.icon}
            path={item.path}
            description={item.description}
          />
        ))}
      </nav>
    </aside>
  );
}
