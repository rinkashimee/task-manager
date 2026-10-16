import { createContext } from 'react';

export type AuthStatus = 'loading' | 'authenticated' | 'unauthenticated';

export interface AuthContextValue {
  status: AuthStatus;
  setAuthenticated: () => void;
  setUnauthenticated: () => void;
}

export const AuthContext = createContext<AuthContextValue | null>(null);
