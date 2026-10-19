import { Outlet } from 'react-router-dom';
import SettingsSidebar from './sidebar/settings-sidebar/SettingsSidebar';

export default function SettingsLayout() {
  return (
    <div className="min-h-0 flex-1 overflow-y-auto">
      <div className="flex min-h-full flex-col gap-3 px-6 pt-3 pb-3 lg:flex-row">
        <SettingsSidebar />

        <main className="flex min-w-0 flex-1 flex-col">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
