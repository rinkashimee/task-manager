export interface LoginFormTypes {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface LoginRequest extends Omit<LoginFormTypes, 'rememberMe'> {}

export interface LoginResponse extends Omit<LoginFormTypes, 'rememberMe' | 'password'> {
  id: string;
  name: string;
  role: string;
}

export type LoginResult =
  { status: 'success'; data: LoginResponse } | { status: 'unverified' } | { status: 'error' };
