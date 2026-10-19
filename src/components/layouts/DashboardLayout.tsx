import Sidebar from '@/components/layouts/sidebar/Sidebar';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

export interface DashboardLayoutContext {
  openSidebar: () => void;
}

export default function DashboardLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  return (
    <div className="bg-background flex h-screen overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <main className="min-h-0 min-w-0 flex-1 overflow-hidden">
        <Outlet
          context={{
            openSidebar: () => setIsSidebarOpen(true),
          }}
        />
      </main>
    </div>
  );
}
