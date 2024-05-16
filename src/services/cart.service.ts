import { PrismaClient } from "@prisma/client";
import { CartRepository } from "../repositories/cart.repository";
import { ICartItem } from "../repositories/types/cart.repository.interface";

export class CartService {
  constructor(private readonly cartRepository: CartRepository) {}
  async getCartByUserId(userId: number) {
    const userCart = await this.cartRepository.getCartByUserId(userId);
    return { userCart };
  }

  async createCart(userId: number) {
    const userCart = await this.cartRepository.createCart({ userId });
    return { userCart };
  }

  async addCartItem(cartItem: Omit<ICartItem, "id">) {
    const item = await this.cartRepository.addCartItem(cartItem);
    return { item };
  }

  async updateCartItem(cartItem: ICartItem) {
    return await this.cartRepository.updateCartItem(cartItem);
  }

  async deleteCartItem(cartItemId: number) {
    return await this.cartRepository.deleteCartItem(cartItemId);
  }
}
