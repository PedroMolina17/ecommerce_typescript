import { AxiosResponse } from "axios";
import { Product } from "../types/products.type";
import { api } from "./axios.config";
import { IcreateProduct, IResponseCreateProduct } from "../types/products.type";
const getAllProducts = async (
  page: number = 1,
  pageSize: number = 10
): Promise<Product> => {
  const { data }: AxiosResponse<Product> = await api.get(
    `product/products?page=${page}&pageSize=${pageSize}`
  );
  return data;
};

const createProduct = async (
  data: IcreateProduct
): Promise<IResponseCreateProduct> => {
  try {
    const { data: response } = await api.post("product/create-product", data);
    return response;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw new Error(
      "Error al crear el producto. Inténtalo de nuevo más tarde."
    );
  }
};
export { getAllProducts, createProduct };
