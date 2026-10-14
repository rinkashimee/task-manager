import AuthLayout from '@/components/layouts/AuthLayout';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import Login from '@/pages/auth/login/Login';
import Dashboard from '@/pages/dashboard/Dashboard';
import MyTasks from '@/pages/my-tasks/MyTasks';
import Project from '@/pages/projects/Project';
import About from '@/pages/settings/pages/about/About';
import Account from '@/pages/settings/pages/account/Account';
import Appearance from '@/pages/settings/pages/appearance/Appearance';
import Settings from '@/pages/settings/Settings';
import { Navigate, Route, Routes } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route
          path="/my-tasks"
          element={<MyTasks variant="default" projectId="" handleRefresh={() => {}} />}
        />
        <Route path="/projects" element={<Project />} />

        <Route path="/settings" element={<Settings />}>
          <Route index element={<Navigate to="account" replace />} />

          <Route path="account" element={<Account />} />
          <Route path="appearance" element={<Appearance />} />
          <Route path="about" element={<About />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
