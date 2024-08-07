import { AxiosResponse } from "axios";
import { Product } from "../types/products.type";
import { api } from "./axios.config";
import {
  IDeleteProduct,
  IResponseDeleteProduct,
  IDUpdateProduct,
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

const createCart = async (dataProduct: any) => {
  try {
    const { data } = await api.post("cart/add-cart-item", dataProduct);
    return data;
  } catch (error) {
    console.error("Error al crear el producto:", error);
    throw new Error(
      "Error al crear el producto. Inténtalo de nuevo más tarde."
    );
  }
};

const updateCart = async (dataProduct: any) => {
  try {
    const { data } = await api.put("cart/update-cart-item", dataProduct);
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

const getCart = async (id: number) => {
  try {
    const { data } = await api.get(`/cart/get-cart/${id}`);
    return data;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw new Error(
      "Error al obtener el producto. Inténtalo de nuevo más tarde."
    );
  }
};

const updateProduct = async (data: IDUpdateProduct) => {
  try {
    await api.put(`product/update-product/${data.id}`, data);
  } catch (error) {
    console.log(error);
  }
};

export {
  getAllProducts,
  createCart,
  deleteProduct,
  getCart,
  updateProduct,
  updateCart,
};
