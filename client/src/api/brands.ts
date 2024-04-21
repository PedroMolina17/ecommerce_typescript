import { AxiosResponse } from "axios";
import { api } from "./axios.config";
import {
  IDeletebrand,
  IResponseBrand,
  IResponseCreateBrand,
  IResponseDeleteBrand,
  ICreateBrand,
} from "../types/brands.type";

const getAllBrands = async (): Promise<IResponseBrand> => {
  const { data }: AxiosResponse<IResponseBrand> = await api.get("brand/brands");

  return data;
};
const createBrand = async (
  data: ICreateBrand,
): Promise<IResponseCreateBrand> => {
  const { data: response }: AxiosResponse<IResponseCreateBrand> =
    await api.post("brand/create-brand", data);
  return response;
};

const deleteBrand = async ({
  id,
}: IDeletebrand): Promise<IResponseDeleteBrand> => {
  const { data }: AxiosResponse<IResponseDeleteBrand> = await api.delete(
    `brand/delete-brand/${id}`,
  );
  return data;
};

export { getAllBrands, createBrand, deleteBrand };
