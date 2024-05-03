import { PrismaClient } from "@prisma/client";
import ClientError from "../errors/clientError.error";

export class ImageProductService {
  constructor(private readonly prisma: PrismaClient) {}
  async createImageProduct(data: any) {}
  async deleteImageProduct(id: number) {
    const productImage = await this.prisma.imageProduct.findUnique({
      where: { id },
    });
    if (!productImage) throw new ClientError("image not found", 404);
    await this.prisma.imageProduct.delete({
      where: { id },
    });
    return { message: "image deleted" };
  }
  async updateImageProduct(id: number, data: any) {}
  async getImageProductById(id: number) {
    const productImage = await this.prisma.imageProduct.findUnique({
      where: { id },
    })
    if (!productImage) return []
    return productImage
  }
  async getAllImageProducts() {}
  async getAllImageProductsByProductId(id: number) {
    const productImages = await this.prisma.imageProduct.findMany({
      where: { productId: id },
    });
    if (!productImages) return [];
    return productImages;
  }
}
