export type VerificationStatus = 'pending' | 'verifying' | 'success' | 'expired' | 'error';

export type VerificationMode = 'registration' | 'login-recovery';

export interface VerifyEmailLocationState {
  email?: string;
  mode?: VerificationMode;
}

export interface ResendVerificationRequest extends VerifyEmailLocationState {}

export interface VerifyEmailRequest {
  token: string;
}
