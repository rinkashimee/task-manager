export interface AccountFormTypes {
  name: string;
  email: string;
  role: string;
}

export interface UpdateAccountTypes {
  name: string;
  email: string;
  avatar?: File | null;
}
