export interface IOrderRepository {
  createOrder(order: Omit<IOrder, "id" | "createAt">): Promise<IOrder>;
  getOrderById(orderId: number): Promise<IOrder | null>;
  getOrderByUserId(userId: number): Promise<IOrder[]>;
  updateOrder(order: IOrder): Promise<IOrder>;
  deleteOrder(orderId: number): Promise<IOrder>;
  addOrderItem(
    orderItem: Omit<IOrderItem, "id" | "createAt">
  ): Promise<IOrderItem>;
  updateOrderItem(orderItem: IOrderItem): Promise<IOrderItem>;
  getOrderItemsByOrderIdAndProductId(
    orderId: number,
    productId: number
  ): Promise<IOrderItem | null>;
}

export interface IOrder {
  id: number;
  userId: number;
  total: number;
  createAt: Date;
}
export interface IOrderItem {
  id: number;
  orderId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  totalItemPrice: number;
  createAt: Date;
}
