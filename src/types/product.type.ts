import { ICreateImageProduct } from "./imageProduct.type";


export interface IDataProduct {
 product:ICreateProduct
 image:string[]
 variantsImage:string[]
}

export interface IDataProductUpdate{
  product:ICreateProduct
  idImageOlds:number[]
  image:string[]
}
export interface ICreateProduct{
  name: string;
  description: string;
  price: number;
  stock: number;
  status: boolean;
  promotion?: boolean;
  promotionPrice?: number;
  promotionDescription?: string;
  categoryId: number;
  brandId: number;
 active?:boolean
}

export interface IProductUpdate extends ICreateProduct {}

export interface IProductDelete {
  id: number;
}
  

