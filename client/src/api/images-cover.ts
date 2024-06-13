import { imageCover } from "@/types/image-cover.type";
import { api } from "./axios.config";
import { AxiosResponse } from "axios";
const imageCoverById = async (id: number): Promise<imageCover> => {
  try {
    const { data }: AxiosResponse<imageCover> = await api.get(
      `imageProductCover/${id}/get-all-img-cover`
    );
    return data;
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw new Error(
      "Error al obtener el producto. Inténtalo de nuevo más tarde."
    );
  }
};

export default imageCoverById;
