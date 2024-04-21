export interface ICreateCategory {
  name: string;
}
export interface IUpdateCategory extends ICreateCategory {
  id: number;
}
export interface IDeleteCategory {
  id: number;
}
