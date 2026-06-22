export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errors: { field: string; message: string; code: string }[] | null;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
