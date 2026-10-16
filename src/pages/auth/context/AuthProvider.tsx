import { useEffect, useState, type ReactNode } from 'react';
import { AuthContext, type AuthStatus } from './AuthContext';
import { tokenManager } from '../services/tokenManager';
import { useSpinner } from '@/components/ui/Spinner/SpinnerContext';
import { refreshAccessToken } from '../services/refreshToken';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider(props: AuthProviderProps) {
  const { children } = props;

  const { showLoading, hideLoading } = useSpinner();

  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    let active = true;

    const restoreSession = async () => {
      showLoading();

      try {
        await refreshAccessToken();

        if (!active) return;

        setStatus('authenticated');
      } catch {
        if (!active) return;

        tokenManager.clearToken();
        setStatus('unauthenticated');
      } finally {
        if (active) {
          hideLoading();
        }
      }
    };

    restoreSession();

    return () => {
      active = false;
      hideLoading();
    };
  }, [showLoading, hideLoading]);

  const setAuthenticated = () => {
    setStatus('authenticated');
  };

  const setUnauthenticated = () => {
    tokenManager.clearToken();
    setStatus('unauthenticated');
  };

  return (
    <AuthContext.Provider value={{ status, setAuthenticated, setUnauthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
