export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  success: boolean;
  status: number;
  message: string;
  errors: Record<string, string> | null;
}
