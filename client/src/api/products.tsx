import { AxiosResponse } from "axios";
import { Product } from "../types/products.type";
import { api } from "./axios.config";

const getAllProducts = async (
  page: number = 1,
  pageSize: number = 10
): Promise<Product> => {
  const { data }: AxiosResponse<Product> = await api.get(
    `product/products?page=${page}&pageSize=${pageSize}`
  );
  return data;
};

export default getAllProducts;
