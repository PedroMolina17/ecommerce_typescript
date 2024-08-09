import { PrismaClient } from "@prisma/client";
import { CartService } from "../services/cart.service";
import { CartRepository } from "../repositories/cart.repository";
import { fnCtrl } from "../types/types";
import registrationError from "../utils/registrationError.util";
import { HTTP_STATUS } from "../constants/statusCode.constants";
import { sendResponse } from "../utils/sendResponse.util";
import { ICartItem } from "../repositories/types/cart.repository.interface";

const cartService = new CartService(new CartRepository(new PrismaClient()));

export const getCartByUserId: fnCtrl = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const cart = await cartService.getCartByUserId(userId);
    sendResponse(res, HTTP_STATUS.OK, cart);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export const createCart: fnCtrl = async (req, res, next) => {
  try {
    const userId = Number(req.params.userId);
    const cart = await cartService.createCart(userId);
    sendResponse(res, HTTP_STATUS.OK, cart);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export const addCartItem: fnCtrl = async (req, res, next) => {
  try {
    const item = req.body as Omit<ICartItem, "id">;
    const cartItem = await cartService.addCartItem(item);
    sendResponse(res, HTTP_STATUS.OK, cartItem);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export const updateCartItem: fnCtrl = async (req, res, next) => {
  try {
    const item = req.body;
    let cartItem;

    if (item.quantity <= 0) {
      cartItem = await cartService.deleteCartItem(item.id);
      return sendResponse(res, HTTP_STATUS.OK, {
        message: "Item removed from cart",
        cartItem,
      });
    } else {
      cartItem = await cartService.updateCartItem(item);
      return sendResponse(res, HTTP_STATUS.OK, cartItem);
    }
  } catch (error) {
    registrationError(error, res, next);
  }
};
