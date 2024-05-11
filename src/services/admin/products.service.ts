import { PrismaClient } from "@prisma/client";
import {
  ICreateProduct,
  IDataProduct,
  IDataProductUpdate,
} from "../../types/product.type";
import ClientError from "../../errors/clientError.error";
import { HTTP_STATUS } from "../../constants/statusCode.constants";
import { CloudinaryService } from "../cloudinary/cloudinary.service";
import { NotificationsService } from "./notifications.service";

export class ProductService {
  constructor(
    private readonly cloudinaryService: CloudinaryService,
    private readonly prisma: PrismaClient,
    private readonly notificationService: NotificationsService
  ) {
    this.cloudinaryService = cloudinaryService;
    this.prisma = prisma;
    this.notificationService = notificationService;
  }
  async createProduct(product: ICreateProduct) {
    const existingProduct = await this.prisma.products.findUnique({
      where: {
        name: product.name,
      },
    });

    if (existingProduct) {
      throw new ClientError("Product already exists", HTTP_STATUS.CONFLICT);
    }

    const newProduct = await this.prisma.products.create({
      data: {
        ...product,
      },
      include: {
        ImageProduct: true,
        ProductCoverImage: true,
        technicalDetailsProduct: true,
      },
    });

    return {
      product: newProduct,
      message: "Product created",
    };
  }

  async updateProduct(dataProduct: IDataProductUpdate, productId: number) {
    const existingProduct = await this.prisma.products.findUnique({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      throw new ClientError("Product not found", HTTP_STATUS.NOT_FOUND);
    }

    const updateProduct = await this.prisma.products.update({
      where: {
        id: productId,
      },
      data: {
        ...dataProduct,
      },
    });

    return updateProduct;
  }
  async deleteProduct(productId: number) {
    const existsProduct = await this.prisma.products.findUnique({
      where: {
        id: productId,
      },
      include: {
        ImageProduct: true,
        ProductCoverImage: true,
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
        }
        await this.prisma.imageProduct.delete({
          where: {
            id: image.id,
          },
        });
      })
    );
    if (existsProduct.ProductCoverImage?.publicIdImage) {
      await this.cloudinaryService.deleteImg(
        existsProduct.ProductCoverImage.publicIdImage
      );
    }
    await this.prisma.productCoverImage.deleteMany({
      where: {
        productId,
      },
    });
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
