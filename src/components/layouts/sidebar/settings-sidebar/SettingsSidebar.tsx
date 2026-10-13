import { settingsNavItems } from '@/config/settingsSidebar';
import SettingsSidebarItem from './SettingsSidebarItem';

export default function SettingsSidebar() {
  return (
    <aside className="bg-card border-border w-full shrink-0 rounded-md border p-3 lg:w-64">
      <nav className="flex gap-2 lg:flex-col">
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
