import { AxiosResponse } from "axios";
import { api } from "./axios.config";
import {
  ICategory,
  IDeletecategory,
  IResponseCategory,
  IResponseCreateCategory,
  IResponseDeleteCategory,
  IcreateCategory,
} from "../types/category.type";

const getAllCategory = async (): Promise<IResponseCategory> => {
  const { data }: AxiosResponse<IResponseCategory> = await api.get(
    "category/categories"
  );

  return data;
};
const createCategory = async (
  data: IcreateCategory
): Promise<IResponseCreateCategory> => {
  const { data: response }: AxiosResponse<IResponseCreateCategory> =
    await api.post("category/create-category", data);
  return response;
};
 
const deleteCategory = async (
    {id}: IDeletecategory
  ): Promise<IResponseDeleteCategory> => {
    const { data }: AxiosResponse<IResponseDeleteCategory> = await api.delete(
      `category/delete-category/${id}`
    );
    return data;
  };
  
export { getAllCategory, createCategory, deleteCategory };
