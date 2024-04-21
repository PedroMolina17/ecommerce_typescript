import { PrismaClient } from "@prisma/client";
import { IDataProduct, IDataProductUpdate } from "../../types/product.type";
import ClientError from "../../errors/clientError.error";
import { HTTP_STATUS } from "../../constants/statusCode.constants";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { NotificationsService } from "./notifications.service";

export class ProductService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly prisma: PrismaClient,
    private readonly notificationService: NotificationsService,
  ) {
    this.cloudinaryService = cloudinaryService;
    this.prisma = prisma;
    this.notificationService = notificationService;
  }
  async createProduct(dataProduct: IDataProduct) {
    const { product, image, productCoverImage } = dataProduct;
    const existingProduct = await this.prisma.products.findUnique({
      where: {
        name: product.name,
      },
    });

    if (existingProduct) {
      throw new ClientError("Product already exists", HTTP_STATUS.CONFLICT);
    }
    console.log("--->prodco", product);
    const newProduct = await this.prisma.products.create({
      data: {
        ...product,
      },
    });

    if (image && productCoverImage) {
      image.forEach(async (image) => {
        const { public_id, secure_url } =
          await this.cloudinaryService.uploadImgProduct(image);
        await this.prisma.imageProduct.create({
          data: {
            imageProduct: secure_url,
            publicIdImage: public_id,
            productId: newProduct.id,
          },
        });
      });

      const { public_id, secure_url } =
        await this.cloudinaryService.uploadImgProduct(productCoverImage[0]);
      await this.prisma.productCoverImage.create({
        data: {
          imageProduct: secure_url,
          publicIdImage: public_id,
          productId: newProduct.id,
        },
      });
    }

    return {
      data: newProduct,
      message: "Product created",
    };
  }

  async updateProduct(dataProduct: IDataProductUpdate, productId: number) {
    const { product, image, idImageOlds } = dataProduct;
    const { name } = product;
    const existingProduct = await this.prisma.products.findUnique({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      throw new ClientError("Product not found", HTTP_STATUS.NOT_FOUND);
    }

    if (image.length > 0 && idImageOlds.length > 0) {
      for (let i = 0; i < idImageOlds.length; i++) {
        const existingImage = await this.prisma.imageProduct.findUnique({
          where: {
            id: idImageOlds[i],
          },
        });
        if (!existingImage) {
          throw new ClientError("image not found", HTTP_STATUS.NOT_FOUND);
        }

        const { public_id, secure_url } =
          await this.cloudinaryService.uploadImgProduct(
            image[i],
            existingImage?.publicIdImage!,
          );
        await this.prisma.imageProduct.update({
          where: {
            id: idImageOlds[i],
          },
          data: {
            imageProduct: secure_url,
            publicIdImage: public_id,
          },
        });
      }
    }
    const updatedProduct = await this.prisma.products.update({
      where: {
        id: productId,
      },
      data: { ...product },
    });
    return {
      data: updatedProduct,
      message: "Product updated",
    };
  }
  async deleteProduct(productId: number) {
    const existsProduct = await this.prisma.products.findUnique({
      where: {
        id: productId,
      },
      include: {
        ImageProduct: true,
      },
    });
    if (!existsProduct) {
      throw new ClientError("Product not found", HTTP_STATUS.NOT_FOUND);
    }
    console.log("--->producto existente", existsProduct.ImageProduct.length, {
      existsProduct: existsProduct.ImageProduct,
    });
    await Promise.all(
      existsProduct.ImageProduct.map(async (image) => {
        if (image.publicIdImage) {
          await this.cloudinaryService.deleteImg(image.publicIdImage);
          await this.prisma.imageProduct.delete({
            where: {
              id: image.id,
            },
          });
        }
      }),
    );
    const deletedProduct = await this.prisma.products.delete({
      where: {
        id: productId,
      },
      select: { name: true },
    });

    return {
      message: `product ${deletedProduct.name} deleted`,
    };
  }
}
