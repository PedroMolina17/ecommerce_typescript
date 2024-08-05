import { PrismaClient } from "@prisma/client";
import {
  ICart,
  ICartItem,
  ICartRespository,
} from "./types/cart.repository.interface";

export class CartRepository implements ICartRespository {
  constructor(private readonly prisma: PrismaClient) {}

  async getCartByUserId(userId: number): Promise<ICart[]> {
    return await this.prisma.cart.findMany({
      where: {
        userId: userId,
      },
      include: {
        cartItem: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async createCart(
    cart: Omit<ICart, "id" | "createAt" | "total">
  ): Promise<ICart> {
    return await this.prisma.cart.create({
      data: cart,
    });
  }

  async deleteCart(cartId: number): Promise<any> {
    return await this.prisma.cart.delete({
      where: {
        id: cartId,
      },
    });
  }

  async updateCart(cart: any): Promise<any> {
    return await this.prisma.cart.update({
      where: {
        id: cart.id,
      },
      data: cart,
    });
  }

  async addCartItem(cartItem: Omit<ICartItem, "id">): Promise<ICartItem> {
    const item = await this.prisma.cartItem.create({
      data: cartItem,
    });

    return item;
  }

  async updateCartItem(cartItem: ICartItem): Promise<ICartItem> {
    const item = await this.prisma.cartItem.update({
      where: {
        id: cartItem.id,
      },
      data: cartItem,
    });

    return item;
  }

  async deleteCartItem(cartItemId: number): Promise<ICartItem> {
    const item = await this.prisma.cartItem.delete({
      where: {
        id: cartItemId,
      },
    });

    return item;
  }
}
