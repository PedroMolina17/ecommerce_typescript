import { ICreateImageProduct } from "./imageProduct.type";

export interface IDataProduct {
  product: ICreateProduct;
  image: string[];
  productCoverImage: string[];
}

export interface IDataProductUpdate {
  product: ICreateProduct;
  updateImage:{newImage:string, oldImageId:number}[]
}
export interface ICreateProduct {
  name: string;
  description: string;
  salePrice: number;
  purchasePrice:number;
  stock: number;
  status: boolean;
  promotion?: boolean;
  promotionPrice?: number;
  promotionDescription?: string;
  categoryId: number;
  brandId: number;
  active?: boolean;
}

export interface IProductUpdate extends ICreateProduct {}

export interface IProductDelete {
  id: number;
}
