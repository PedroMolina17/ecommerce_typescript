import { OrderRepository } from "../repositories/order.repository";
import {
  IOrder,
  IOrderItem,
} from "../repositories/types/order.repository.interface";

export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}

  async createOrder(order: Omit<IOrder, "id" | "createAt">) {
    const newOrder = await this.orderRepository.createOrder(order);
    return { data: newOrder };
  }

  async getOrderByUserId(userId: number) {
    return await this.orderRepository.getOrderByUserId(userId);
  }

  async updateOrder(order: IOrder) {
    return await this.orderRepository.updateOrder(order);
  }

  async deleteOrder(orderId: number) {
    return await this.orderRepository.deleteOrder(orderId);
  }

  async addOrderItem(orderItem: Omit<IOrderItem, "id" | "createAt">) {
    const newOrderItem = await this.orderRepository.addOrderItem(orderItem);
    return { data: newOrderItem };
}
}
