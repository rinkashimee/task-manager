import { createContext } from 'react';
import type { AuthUser } from '../login/types/Login.types';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface AuthContextValue {
  status: AuthStatus;
  user: AuthUser | null;
  setAuthenticated: (user: AuthUser) => void;
  setUnauthenticated: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
