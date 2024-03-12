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

export interface IcreateProduct {
  name: string;
  categoryId: number;
  price: number;
  image: File | null;
  description: string;
  stock: number;
  status: boolean;
  promotion: boolean;
  promotionPrice: number;
  promotionDescription?: string;
  brandId: number;
}
export interface IResponseCreateProduct {
  error: boolean;
  statusCode: number;
  message: string;
}
