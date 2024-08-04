import { AxiosResponse } from "axios";
import { Product } from "../types/products.type";
import { api } from "./axios.config";
import {
  ICreateProduct,
  IResponseCreateProduct,
  IDeleteProduct,
  IResponseDeleteProduct,
  IDUpdateProduct,
} from "../types/products.type";

const getImageCoverById = async (id: number) => {
  const { data }: AxiosResponse = await api.get(
    `imageProductCover/${id}/get-all-img-cover`
  );

  return data;
};

const getAllImageCover = async () => {
  const { data }: AxiosResponse = await api.get(
    `/imageProductCover/get-all-img-cover`
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

const getProductById = async (productId: number): Promise<Product> => {
  try {
    const { data }: AxiosResponse<Product> = await api.get(
      `product/${productId}`
    );
    return data;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw new Error(
      "Error al obtener el producto. Inténtalo de nuevo más tarde."
    );
  }
};

const updateProduct = async (data: IDUpdateProduct) => {
  await api.put(`product/update-product/${data.id}`, data);
};

export {
  getAllImageCover,
  getImageCoverById,
  createProduct,
  deleteProduct,
  getProductById,
  updateProduct,
};
