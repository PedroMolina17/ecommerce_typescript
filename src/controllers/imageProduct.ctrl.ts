import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/statusCode.constants";
import { sendResponse } from "../utils/sendResponse.util";
import registrationError from "../utils/registrationError.util";
import { ImageProductService } from "../services/imageProduct.service";
import { PrismaClient } from "@prisma/client";
type fnCtrl = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;

const imageProductService = new ImageProductService(new PrismaClient());
export const getImageProductById: fnCtrl = async (req, res, next) => {
  try {
    const imageId = Number(req.params.imageId);
    const imageProduct = await imageProductService.getImageProductById(imageId);
    sendResponse(res, HTTP_STATUS.OK, { imageProduct });
  } catch (error) {
    registrationError(error, res, next);
  }
};

export const getAllImageProductsByProductId: fnCtrl = async (
  req,
  res,
  next,
) => {
  try {
    const productId = Number(req.params.productId);
    const productImages =
      await imageProductService.getAllImageProductsByProductId(productId);
    sendResponse(res, HTTP_STATUS.OK, { productImages });
  } catch (error) {
    registrationError(error, res, next);
  }
};

export const uploadImageProduct: fnCtrl = async (req, res, next) => {
  try {
  } catch (error) {}
};

export const deleteImageProduct: fnCtrl = async (req, res, next) => {
  try {
    const imageId = Number(req.params.imageId);
    const message = await imageProductService.deleteImageProduct(imageId);
    sendResponse(res, HTTP_STATUS.OK, message);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export const deleteAllImageProductById: fnCtrl = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    const message =
      await imageProductService.deleteAllImageProductsByProductId(productId);
    sendResponse(res, HTTP_STATUS.OK, message);
  } catch (error) {
    registrationError(error, res, next);
  }
};
