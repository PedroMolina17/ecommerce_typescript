import { PrismaClient } from "@prisma/client";
import { ICreateTechnicalDetailsProduct } from "../types/technicalDetailsProduct.type";
const prisma = new PrismaClient();

export class TechnicalDetailsProductService {
  static async createTechnicalDetailsProduct(
    technicalDetailsProduct: ICreateTechnicalDetailsProduct[]
  ) {
    const existingDetails = await prisma.technicalDetailsProduct.findMany({
      where: {
        name: {
          in: technicalDetailsProduct.map((detail) => detail.name),
        },
      },
    });

    const existingDetailNames = existingDetails.map((detail) => detail.name);
    const newDetailsToCreate = technicalDetailsProduct.filter(
      (detail) => !existingDetailNames.includes(detail.name)
    );

    const createdDetails = await prisma.technicalDetailsProduct.createMany({
      data: newDetailsToCreate,
    });

    return {
      message: "technicalDetailsProduct created",
      createdDetails,
      existingDetails,
    };
  }
  static async getTechnicalDetailsProduct() {
    const technicalDetailsProduct =
      await prisma.technicalDetailsProduct.findMany();
    return { technicalDetailsProduct };
  }
}
