import { IResponse } from "./response.type";

export interface Product {
  product: any;
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
export interface Data {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  status: boolean;
  image: string;
  promotion: boolean;
  promotionPrice: number;
  promotionDescription: string;
  categoryId: number;
  brandId: number;
}
export interface ICreateProduct {
  name: string;
  categoryId: number;
  price: number;
  image: File;
  description: string;
  stock: number;
  status: boolean;
  promotion: boolean;
  promotionPrice: number;
  promotionDescription?: string;
  brandId: number;
}
export interface IResponseCreateProduct extends Response {
  data: Data;
  message: string;
}
export interface IDUpdateProduct {
  id: number;
}

export interface IDeleteProduct {
  id: number;
}
export interface IResponseDeleteProduct extends IResponse {
  message: string;
}
