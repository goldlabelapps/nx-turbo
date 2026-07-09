export type T_ClientsSeverity = 'success' | 'error' | 'info' | 'warning';

export type T_ClientData = {
  email?: string | null;
  skin_type?: string | null;
  is_pregnant?: boolean;
  concern_tags?: string[];
  display_name?: string;
  date_of_birth?: string | null;
  skin_overview?: string | null;
  personal_notes?: string | null;
  is_breastfeeding?: boolean;
  current_medication?: string | null;
  [key: string]: unknown;
};

export type T_ClientListItem = {
  client_id?: string;
  practitioner_id?: string;
  title?: string;
  created?: string;
  updated?: string;
  data?: T_ClientData;
  [key: string]: unknown;
};

export type T_ClientsMeta = {
  time?: string;
  baseURL?: string;
  severity?: T_ClientsSeverity;
  message?: string;
  [key: string]: unknown;
};

export type T_ClientsPagination = {
  total?: number;
  page?: number;
  number?: number;
  returned?: number;
  totalPages?: number;
  hasMore?: boolean;
  random?: boolean;
  [key: string]: unknown;
};

export type T_ClientsPayload = {
  meta?: T_ClientsMeta | null;
  query?: string | null;
  pagination?: T_ClientsPagination | null;
  list?: T_ClientListItem[];
};

export type T_ClientsFetchFeedback = {
  severity?: T_ClientsSeverity;
  message?: string;
};

export type T_FetchClientsResponse = {
  meta?: T_ClientsMeta;
  data?: {
    query?: string;
    pagination?: T_ClientsPagination;
    list?: T_ClientListItem[];
    [key: string]: unknown;
  };
};