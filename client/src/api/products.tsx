import { AxiosResponse } from "axios";
import { Users } from "../types/user.type";
import { api } from "./axios.config";

const getAllProducts = async (
  page: number = 1,
  pageSize: number = 10
): Promise<Users> => {
  const { data }: AxiosResponse<Users> = await api.get(
    `product/products?page=${page}&pageSize=${pageSize}`
  );
  return data;
};

export default getAllProducts;
