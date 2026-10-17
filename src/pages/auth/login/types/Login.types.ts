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
  accessToken: string;
  tokenType: string;
  expiresIn: number;
}

export type LoginResult =
  { status: 'success'; data: LoginResponse } | { status: 'unverified' } | { status: 'error' };

export interface RefreshResponse extends Pick<
  LoginResponse,
  'accessToken' | 'tokenType' | 'expiresIn'
> {}

export interface AuthUser extends Pick<LoginResponse, 'id' | 'name' | 'email' | 'role'> {}
