import { PrismaClient } from "@prisma/client";
import { CloudinaryService } from "./cloudinary/cloudinary.service";
import { HTTP_STATUS } from "../constants/statusCode.constants";
import ClientError from "../errors/clientError.error";

export class ImageProductCoverService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly cloudinaryService: CloudinaryService
  ) {}
  async getAllImageProductCovers() {
    const imageProductCovers = await this.prisma.productCoverImage.findMany();

    if (imageProductCovers.length === 0) {
      return {
        message: "images not found",
        imageProductCovers: [],
      };
    }

    return imageProductCovers;
  }

  async getAllImageProductCoverByProductId(productId: number) {
    const existingProduct = await this.prisma.products.findUnique({
      where: {
        id: productId,
      },
    });

    if (!existingProduct) {
      throw new ClientError("product not found", HTTP_STATUS.NOT_FOUND);
    }

    const imageProductCovers = await this.prisma.productCoverImage.findMany({
      where: { productId },
    });

    if (imageProductCovers.length === 0) {
      return {
        message: "images not found",
        imageProductCovers: [],
      };
    }

    return imageProductCovers;
  }
}
