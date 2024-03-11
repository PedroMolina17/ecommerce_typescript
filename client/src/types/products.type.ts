export interface Product {
  error: boolean;
  info: Info;
  results: Result[];
}

export interface Info {
  count: number;
  pages: number;
  totalItems: number;
  next: string | null;
  prev: null | string;
}

export interface Result {
  id: number;
  name: string;
}
