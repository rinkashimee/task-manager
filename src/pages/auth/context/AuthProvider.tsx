import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { AuthContext, type AuthStatus } from './AuthContext';
import { tokenManager } from '../services/tokenManager';
import { useSpinner } from '@/components/ui/Spinner/SpinnerContext';
import { refreshAccessToken } from '../services/refreshToken';
import type { AuthUser } from '../login/types/Login.types';
import { authApi } from '../services/authApi';

interface AuthProviderProps {
  children: ReactNode;
}

export default function AuthProvider(props: AuthProviderProps) {
  const { children } = props;

  const [status, setStatus] = useState<AuthStatus>('loading');
  const [user, setUser] = useState<AuthUser | null>(null);

  const { showLoading, hideLoading } = useSpinner();

  useEffect(() => {
    let active = true;
    const sessionVersion = tokenManager.getSessionVersion();

    const restoreSession = async () => {
      showLoading();

      try {
        await refreshAccessToken();

        const response = await authApi.getCurrentUser();

        if (!active || sessionVersion !== tokenManager.getSessionVersion()) {
          return;
        }

        setUser(response.data);
        setStatus('authenticated');
      } catch {
        if (!active || sessionVersion !== tokenManager.getSessionVersion()) {
          return;
        }

        tokenManager.clearToken();
        setUser(null);
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

  const setAuthenticated = useCallback((user: AuthUser) => {
    setUser(user);
    setStatus('authenticated');
  }, []);

  const setUnauthenticated = useCallback(() => {
    tokenManager.clearToken();
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        status,
        user,
        setAuthenticated,
        setUnauthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
