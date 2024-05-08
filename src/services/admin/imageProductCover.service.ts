import { PrismaClient } from "@prisma/client";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import ClientError from "../../errors/clientError.error";
import { HTTP_STATUS } from "../../constants/statusCode.constants";

export class ImageProductCoverService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly cloudinaryService: CloudinaryService
  ) {}
  async createImageProductCover(productId: number, image: string[]) {
    if (image.length === 0) throw new ClientError("image not found", 404);

    const existingProduct = await this.prisma.products.findUnique({
      where: { id: productId },
    });

    if (!existingProduct) throw new ClientError("product not found", 404);

    const { public_id, secure_url } =
      await this.cloudinaryService.uploadImgProduct(image[0]);
    await this.prisma.imageProduct.create({
      data: {
        publicIdImage: public_id,
        imageProduct: secure_url,
        productId: existingProduct.id,
      },
    });
    return { message: "cover image of the created product" };
  }

  async deleteImageProductCoverById(imageId: number) {
    const existingImage = await this.prisma.imageProduct.findUnique({
      where: { id: imageId },
    });

    if (!existingImage) {
      throw new ClientError("image not found", HTTP_STATUS.NOT_FOUND);
    }

    if (existingImage.publicIdImage === null) {
      throw new ClientError("public id not found", HTTP_STATUS.NOT_FOUND);
    }

    await this.cloudinaryService.deleteImg(existingImage.publicIdImage);

    await this.prisma.productCoverImage.delete({
      where: {
        id: existingImage.id,
      },
    });

    return { message: "image deleted" };
  }

  async deleteAllImageProductCoverByProductId(productId: number) {
    const images = await this.prisma.productCoverImage.findMany({
      where: { productId },
    });

    if (images.length === 0) {
      throw new ClientError("images not found", HTTP_STATUS.NOT_FOUND);
    }

    const promisesOfImages = images.map(async (image) => {
      if (image.publicIdImage === null) {
        throw new ClientError("public id not found", HTTP_STATUS.NOT_FOUND);
      }

      return await this.cloudinaryService.deleteImg(image.publicIdImage);
    });

    await Promise.all(promisesOfImages);

    await this.prisma.productCoverImage.deleteMany({
      where: { productId },
    });

    return { message: `all images associated with id:${productId} deleted` };
  }

  async updateImageProductCover(data: string[], imagesOldId: number[]) {
    if (imagesOldId.length === 0 || data.length === 0) {
      throw new ClientError("images not found", 404);
    }
    await Promise.all(
      imagesOldId.map(async (id, index) => {
        const existingImg = await this.prisma.imageProduct.findUnique({
          where: { id },
        });

        if (!existingImg) {
          throw new ClientError("image not found", HTTP_STATUS.NOT_FOUND);
        }

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
}
