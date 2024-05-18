import { PrismaClient } from "@prisma/client";
import { OrderRepository } from "../repositories/order.repository";
import { OrderService } from "../services/order.service";
import { fnCtrl } from "../types/types";
import registrationError from "../utils/registrationError.util";
import {
  IOrder,
  IOrderItem,
} from "../repositories/types/order.repository.interface";
import { HTTP_STATUS } from "../constants/statusCode.constants";
import { sendResponse } from "../utils/sendResponse.util";

const orderService = new OrderService(new OrderRepository(new PrismaClient()));

export const createOrder: fnCtrl = async (req, res, next) => {
  try {
    const order = req.body as Omit<IOrder, "id" | "createAt">;
    const newOrder = await orderService.createOrder(order);
    sendResponse(res, HTTP_STATUS.CREATED, newOrder);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export const addOrderItem: fnCtrl = async (req, res, next) => {
  try {
    const item = req.body as Omit<IOrderItem, "id" | "createAt">;
    const orderItem = await orderService.addOrderItem(item);
    sendResponse(res, HTTP_STATUS.OK, orderItem);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export const getOrderByUserId: fnCtrl = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const order = await orderService.getOrderByUserId(userId);
    sendResponse(res, HTTP_STATUS.OK, order);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export const deleteOrderByOrderId: fnCtrl = async (req, res, next) => {
  try {
    const orderId = Number(req.params.orderId);
    const order = await orderService.deleteOrderByOrderId(orderId);
    sendResponse(res, HTTP_STATUS.OK, order);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export const UpdateOrderItemByOrderItemId: fnCtrl = async (req, res, next) => {
  try {
    const orderItemId = Number(req.params.orderItemId);
    const orderItem = req.body as Partial<Omit<IOrderItem, "id">>;
    const order = await orderService.updateOrderItemByOrderItemId(
      orderItemId,
      orderItem
    );
    sendResponse(res, HTTP_STATUS.OK, order);
  } catch (error) {
    registrationError(error, res, next);
  }
}
