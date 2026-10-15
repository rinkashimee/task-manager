export interface RegisterFormTypes {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface RegisterRequest extends RegisterFormTypes {}

export interface RegisterResponse extends Omit<RegisterFormTypes, 'confirmPassword'> {}
