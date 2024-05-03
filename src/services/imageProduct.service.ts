import { PrismaClient } from "@prisma/client";

export class ImageProductService {
  constructor(private readonly prisma: PrismaClient) {}
  async createImageProduct(data: any) {}
  async deleteImageProduct(id: number) {}
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
