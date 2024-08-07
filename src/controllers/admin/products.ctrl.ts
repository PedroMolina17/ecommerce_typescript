import { Response, Request, NextFunction } from "express";
import {
  ICreateProduct,
  IDataProduct,
  IDataProductUpdate,
  IProductDelete,
  IProductUpdate,
} from "../../types/product.type";
import { ProductService } from "../../services/admin/products.service";
import registrationError from "../../utils/registrationError.util";
import { sendResponse } from "../../utils/sendResponse.util";
import { HTTP_STATUS } from "../../constants/statusCode.constants";
import { CloudinaryService } from "../../services/cloudinary/cloudinary.service";
import { PrismaClient } from "@prisma/client";
import { processFiles } from "../../utils/processFIles.util";
import { parseProduct } from "../../utils/parseProduct.util";
import { NotificationsService } from "../../services/admin/notifications.service";

const prisma = new PrismaClient();
const cloudinaryService = new CloudinaryService();
const notificationService = new NotificationsService(prisma);
const productService = new ProductService(
  cloudinaryService,
  prisma,
  notificationService
);

const getProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = req.body;

    const data = await productService.createProduct(product);

    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};

const updateProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productId = Number(req.params.productId);
    const product = req.body;
    if (product.brandId) {
      product.brandId = Number(product.brandId);
    }
    if (product.categoryId) {
      product.categoryId = Number(product.categoryId);
    }

    console.log({ product, productId });
    const data = await productService.updateProduct(product, productId);
    sendResponse(res, HTTP_STATUS.OK, { product: data });
  } catch (error) {
    console.error("Error:", error);
    registrationError(error, res, next);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const productId = Number(id);
    const data = await productService.deleteProduct(productId);
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export { createProduct, updateProduct, deleteProduct };
