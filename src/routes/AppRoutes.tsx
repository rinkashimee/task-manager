import DashboardLayout from '@/components/layouts/DashboardLayout';
import Dashboard from '@/pages/dashboard/Dashboard';
import MyTasks from '@/pages/my-tasks/MyTasks';
import { Navigate, Route, Routes } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-tasks" element={<MyTasks />} />
        <Route path="/projects" element={<Dashboard />} />
        <Route path="/settings" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
