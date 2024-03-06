import { AxiosResponse } from "axios";
import { api } from "./axios.config";
import { ICategory, IResponseCategory } from "../types/category.type";

const getAllCategory = async (): Promise<IResponseCategory> => {
  const{data}: AxiosResponse<IResponseCategory> = await api.get(
    "category/categories"
  );


  return data;
};

export { getAllCategory };
