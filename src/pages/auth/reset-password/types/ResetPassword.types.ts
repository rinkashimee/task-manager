export interface ResetPasswordFormTypes {
  newPassword: string;
  confirmPassword: string;
}

export interface ResetPasswordRequest extends Pick<ResetPasswordFormTypes, 'newPassword'> {
  token: string;
}
