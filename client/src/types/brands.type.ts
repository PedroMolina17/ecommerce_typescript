import { IResponse } from "./response.type";

export interface IResponseBrand extends IResponse {
  data: IBrand[];
}
export interface IBrand {
  id: number;
  name: string;
  createAt: string;
}
export interface ICreateBrand {
  name: string;
}
export interface IResponseCreateBrand extends IResponse {
  message: string;
}

export interface IDeletebrand {
  id: number;
}
export interface IResponseDeleteBrand extends IResponse {
  message: string;
}
