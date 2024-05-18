import { HTTP_STATUS } from "../constants/statusCode.constants";
import ClientError from "../errors/clientError.error";
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
    const order = await this.orderRepository.getOrderByUserId(userId);
    return { data: order };
  }

  async updateOrder(order: IOrder) {
    return await this.orderRepository.updateOrder(order);
  }

  async deleteOrderByOrderId(orderId: number) {
    return await this.orderRepository.deleteOrder(orderId);
  }

  async addOrderItem(orderItem: Omit<IOrderItem, "id" | "createAt">) {
    const { orderId, productId } = orderItem;
    const existingItem =
      await this.orderRepository.getOrderItemsByOrderIdAndProductId(
        orderId,
        productId
      );
    if (existingItem) {
      throw new ClientError("Item already exists", HTTP_STATUS.CONFLICT);
    }
    const newOrderItem = await this.orderRepository.addOrderItem(orderItem);
    const listOrderItems = await this.orderRepository.getAllOrderItemsByOrderId(
      orderId
    );
    const total = listOrderItems.reduce(
      (acc, item) => acc + item.totalItemPrice,
      0
    );
    await this.orderRepository.updateOrder({ id: orderId, total: total });
    return { data: newOrderItem };
  }

  async updateOrderItemByOrderItemId(
    orderItemId: number,
    orderItem: Partial<Omit<IOrderItem, "id">>
  ) {
    const existingItem = await this.orderRepository.getOrderItemById(
      orderItemId
    )
    if (!existingItem) {
      throw new ClientError("Item not found", HTTP_STATUS.NOT_FOUND);
    }
    const updatedOrderItem = await this.orderRepository.updateOrderItem({
      id: orderItemId,
      ...orderItem,
    });

    const listOrderItems = await this.orderRepository.getAllOrderItemsByOrderId(
      orderItem.orderId!
    );
    const total = listOrderItems.reduce(
      (acc, item) => acc + item.totalItemPrice,
      0
    );
    await this.orderRepository.updateOrder({
      id: orderItem.orderId,
      total: total,
    });
    return { data: updatedOrderItem };
  }
}
