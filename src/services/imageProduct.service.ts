import { PrismaClient } from "@prisma/client";
import ClientError from "../errors/clientError.error";
import cloudinary from "../configs/cloudinary.config";
import { CloudinaryService } from "./cloudinary/cloudinary.service";

export class ImageProductService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly cloudinaryService: CloudinaryService
  ) {}
  async createImageProduct(productId: number, images: string[]) {
    if (images.length === 0) throw new ClientError("images not found", 404);
    images.forEach(async (image) => {
      const { public_id, secure_url } =
        await this.cloudinaryService.uploadImgProduct(image);
      await this.prisma.imageProduct.create({
        data: {
          publicIdImage: public_id,
          imageProduct: secure_url,
          productId: productId,
        },
      });
    });
    return { message: "image created" };
  }
  async deleteImageProduct(id: number) {
    const productImage = await this.prisma.imageProduct.findUnique({
      where: { id },
    });
    if (!productImage) {
      throw new ClientError("image not found", 404);
    }
    await this.prisma.imageProduct.delete({
      where: { id },
    });
    return { message: "image deleted" };
  }
  async deleteAllImageProductsByProductId(id: number) {
    const productImages = await this.prisma.imageProduct.findMany({
      where: { productId: id },
    });
    if (productImages.length === 0) {
      throw new ClientError("images not found", 404);
    }
    console.log("--->", productImages);
    await this.prisma.imageProduct.deleteMany({
      where: { productId: id },
    });
    return { message: "images deleted" };
  }
  async updateImageProduct(data: string[], imagesOldId: number[]) {
    if (imagesOldId.length === 0 || data.length === 0) {
      throw new ClientError("images not found", 404);
    }
    
    await Promise.all(
      imagesOldId.map(async (id, index) => {
        const existingImg = await this.prisma.imageProduct.findUnique({
          where: { id },
        });

        if (!existingImg) throw new ClientError("image not found", 404);
        
        const { public_id, secure_url } =
          await this.cloudinaryService.uploadImgProduct(
            data[index],
            existingImg.publicIdImage
          );

        return await this.prisma.imageProduct.update({
          where: { id: existingImg.id },
          data: {
            publicIdImage: public_id,
            imageProduct: secure_url,
          },
        });
      })
    );
    
    return { message: "image updated" };
  }
  async getImageProductById(id: number) {
    const productImage = await this.prisma.imageProduct.findUnique({
      where: { id },
    });
    if (!productImage) return [];
    return productImage;
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
