import { Outlet } from 'react-router-dom';
import SettingsSidebar from './sidebar/settings-sidebar/SettingsSidebar';

export default function SettingsLayout() {
  return (
    <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto px-6 py-3 lg:flex-row">
      <SettingsSidebar />

      <main className="min-w-0 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
