export interface BackendResponse<T> {
  data: T;
  error: string | null;
  message: string | null;
  message_type: string;
  validations: string[];
}

export interface PaginatedData<T> {
  currentPage: number;
  data: T;
  from: number;
  lastPage: number;
  perPage: number;
  to: number;
  total: number;
}
