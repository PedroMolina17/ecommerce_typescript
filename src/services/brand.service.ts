import { PrismaClient } from "@prisma/client";
import { ICreateBrand, IDeleteBrand, IUpdateBrand } from "../types/brand.type";
import { HTTP_STATUS } from "../constants/statusCode.constants";
import ClientError from "../errors/clientError.error";
const prisma = new PrismaClient();

export class BrandService {
  static async getBrands() {
    const brands = await prisma.brand.findMany();
    return { data: brands };
  }
  static async createBrand(brand: ICreateBrand) {
    const brandExists = await prisma.brand.findUnique({
      where: { ...brand },
    });

    if (brandExists) {
      throw new ClientError(
        `already exists a brand with name ${brand.name}, please use another name`,
        HTTP_STATUS.CONFLICT,
      );
    }

    const createdBrand = await prisma.brand.create({
      data: { ...brand },
    });
    return {
      message: "brand created",
    };
  }

  static async updateBrand(brand: IUpdateBrand) {
    const updatedBrand = await prisma.brand.update({
      where: { id: brand.id },
      data: { name: brand.name },
    });
    return {
      message: "brand updated",
    };
  }

  static async deleteBrand(brandId:number) {
    await prisma.brand.delete({
      where: { id: brandId },
    });
    return {
      message: "brand deleted",
    };
  }
}
