import { PrismaClient } from "@prisma/client";
import ClientError from "../errors/clientError.error";

export class RatingService {
  constructor(private readonly prisma: PrismaClient) {}
  async getRatingByProductId(productId: number) {
    const rating = await this.prisma.rating.findMany({
      where: {
        productId,
      },
    });
    if (rating.length === 0) {
      throw new ClientError("rating not found", 404);
    }
    return { message: "rating found", rating:rating };
  }

  async createRating(data: {
    productId: number;
    userId: number;
    rating: number;
  }) {
    const existsRating = await this.prisma.rating.findFirst({
      where: {
        productId: data.productId,
        userId: data.userId,
      },
    })
    if (existsRating) {
      throw new ClientError("rating already exists", 409);
    }

    const newRating = await this.prisma.rating.create({
      data: {
        ...data,
      },
    });

    const averageRating = await this.calculateRatingByProductId(data.productId)
    await this.prisma.products.update({
      where: {
        id: data.productId
      },
      data: {
        rating: averageRating
      }
    })
    return { message: "rating created", data: newRating };
  }

  async updateRating(data: { id: number; rating: number }) {
    const { id, rating } = data;
    const ratingUpdated = await this.prisma.rating.update({
      where: {
        id,
      },
      data: {
        rating,
      },
    });
    return { message: "rating updated", data: ratingUpdated };
  }

  private async calculateRatingByProductId(productId: number) {
    const rating = await this.prisma.rating.findMany({
      where: {
        productId,
      }
    })
    if (rating.length === 0) {
      throw new ClientError("rating not found", 404);
    }
    const totalRating:number = rating.reduce((acc,current)=>{
      return acc + current.rating
    },0)
     const averageRating:number = totalRating / rating.length
     return averageRating
  }

}
