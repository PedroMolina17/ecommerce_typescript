import { OrderItem, PrismaClient } from "@prisma/client";
import {
  IOrder,
  IOrderItem,
  IOrderRepository,
} from "./types/order.repository.interface";

export class OrderRepository implements IOrderRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async createOrder(order: Omit<IOrder, "id" | "createAt">): Promise<IOrder> {
    const newOrder = await this.prisma.order.create({
      data: order,
    });
    return newOrder;
  }

  async getOrderById(orderId: number): Promise<IOrder | null> {
    const order = await this.prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    return order;
  }

  async getOrderByUserId(userId: number): Promise<IOrder[]> {
    const orders = await this.prisma.order.findMany({
      where: {
        userId: userId,
      },
    });
    return orders;
  }

  async updateOrder(order: IOrder): Promise<IOrder> {
    const newOrder = await this.prisma.order.update({
      where: {
        id: order.id,
      },
      data: order,
    });
    return newOrder;
  }

  async deleteOrder(orderId: number): Promise<IOrder> {
    const deletedOrder = await this.prisma.order.delete({
      where: {
        id: orderId,
      },
    });
    return deletedOrder;
  }

  async addOrderItem(
    orderItem: Omit<IOrderItem, "id" | "createAt">
  ): Promise<IOrderItem> {
    const existingItem = await this.getOrderItemsByOrderIdAndProductId(
      orderItem.orderId,
      orderItem.productId
    );
    if (existingItem) {
      const newItem = {
        ...orderItem,
        id: existingItem.id,
        createAt: existingItem.createAt,
      };
      return await this.updateOrderItem(newItem);
    }
    return await this.prisma.orderItem.create({
      data: orderItem,
    });
  }
  async updateOrderItem(orderItem: OrderItem): Promise<IOrderItem> {
    return await this.prisma.orderItem.update({
      where: {
        id: orderItem.id,
      },
      data: orderItem,
    });
  }

  async getOrderItemsByOrderIdAndProductId(
    orderId: number,
    productId: number
  ): Promise<IOrderItem | null> {
    return await this.prisma.orderItem.findFirst({
      where: {
        orderId: orderId,
        productId: productId,
      },
    });
  }
}
