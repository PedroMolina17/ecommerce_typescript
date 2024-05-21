import { AxiosResponse } from "axios";
import { api } from "./axios.config";

import {
  IResponseCategory,
  IResponseCreateCategory,
  IResponseDeleteCategory,
  IUpdateCategory,
  IcreateCategory,
  ResponseUpdateCategory,
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

const deleteCategory = async (id: number): Promise<IResponseDeleteCategory> => {
  const { data }: AxiosResponse<IResponseDeleteCategory> = await api.delete(
    `category/delete-category/${id}`
  );
  return data;
};

const updateCategory = async (
  id: number,
  cateData: IUpdateCategory
): Promise<ResponseUpdateCategory> => {
  const { data }: AxiosResponse<ResponseUpdateCategory> = await api.put(
    `category/update-category/${id}`,
    cateData
  );
  return data;
};

export { createCategory, deleteCategory, getAllCategory, updateCategory };
