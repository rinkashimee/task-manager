export type VerificationStatus = 'pending' | 'verifying' | 'success' | 'expired' | 'error';

export interface VerifyEmailLocationState {
  email?: string;
}

export interface ResendVerificationRequest extends VerifyEmailLocationState {}

export interface VerifyEmailRequest {
  token: string;
}
