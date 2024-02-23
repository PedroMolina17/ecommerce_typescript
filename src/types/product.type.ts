
type Json ={ key: string;value: string;}[];
export interface IProductCreate {
  name: string;
  description: string;
  technicalDescription: Json;
  price: number;
  stock: number;
  status: boolean;
  image: string;
  promotion: boolean;
  promotionPrice: number;
  promotionDescription?: string;
  categoryId: number;
  brandId: number;
}
export interface IProductUpdate extends IProductCreate {
  id: number;
}
export interface IProductDelete {
  id: number;
}
  

