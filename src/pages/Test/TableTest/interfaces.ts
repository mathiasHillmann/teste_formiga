export interface Client {
  id: number;
  active: boolean;
  branches_count: number;
  cnpj: string;
  fantasy: string;
  name: string;
}

export interface ClientFilters {
  search: string | null;
}
