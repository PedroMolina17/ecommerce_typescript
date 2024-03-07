import { IResponse } from "./response.type";

export interface IResponseCategory extends IResponse {
  data: ICategory[];
}
export interface ICategory {
  id: number;
  name: string;
}
