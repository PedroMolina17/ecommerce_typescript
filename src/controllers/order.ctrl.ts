import { PrismaClient } from "@prisma/client";
import { OrderRepository } from "../repositories/order.repository";
import { OrderService } from "../services/order.service";
import { fnCtrl } from "../types/types";
import registrationError from "../utils/registrationError.util";
import { IOrder, IOrderItem } from "../repositories/types/order.repository.interface";
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
}
