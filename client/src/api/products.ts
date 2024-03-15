import { AxiosResponse } from "axios";
import { Product } from "../types/products.type";
import { api } from "./axios.config";
import {
  ICreateProduct,
  IResponseCreateProduct,
  IDeleteProduct,
  IResponseDeleteProduct,
} from "../types/products.type";
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
  dataProduct: ICreateProduct
): Promise<IResponseCreateProduct> => {
  try {
    const { data }: AxiosResponse<IResponseCreateProduct> = await api.post(
      "product/create-product",
      dataProduct
    );
    return data;
    const { data }: AxiosResponse<IResponseCreateProduct> = await api.post(
      "product/create-product",
      dataProduct
    );
    return data;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw new Error(
      "Error al crear el producto. Inténtalo de nuevo más tarde."
    );
  }
};
const deleteProduct = async (
  row: IDeleteProduct
): Promise<IResponseDeleteProduct> => {
  try {
    const { data }: AxiosResponse<IResponseDeleteProduct> = await api.delete(
      `product/delete-product/${row}`
    );
    return data;
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    throw error;
  }
};

// const updateProduct = async ({
//   id,
// }: IDUpdateProduct): Promise<IResponseDeleteCategory> => {
//   const { data }: AxiosResponse<IResponseDeleteCategory> = await api.delete(
//     `category/delete-category/${id}`
//   );
//   return data;
// };

export { getAllProducts, createProduct, deleteProduct };
