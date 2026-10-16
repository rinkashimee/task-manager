import { Navigate, Outlet } from 'react-router-dom';
import { useAuthSession } from '@/pages/auth/hooks/useAuthSession';

export default function ProtectedRoute() {
  const { status } = useAuthSession();

  if (status === 'loading') {
    return null;
  }

  if (status === 'unauthenticated') {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
