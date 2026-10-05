import DashboardLayout from '@/layouts/DashboardLayout';
import Dashboard from '@/pages/Dashboard';
import { Navigate, Route, Routes } from 'react-router-dom';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      <Route element={<DashboardLayout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-tasks" element={<Dashboard />} />
        <Route path="/projects" element={<Dashboard />} />
        <Route path="/settings" element={<Dashboard />} />
      </Route>
    </Routes>
  );
}
