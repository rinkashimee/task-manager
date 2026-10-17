import { Navigate, Outlet } from 'react-router-dom';
import { useAuthSession } from '@/pages/auth/hooks/useAuthSession';

export default function GuestRoute() {
  const { status } = useAuthSession();

  if (status === 'loading') {
    return null;
  }

  if (status === 'authenticated') {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
