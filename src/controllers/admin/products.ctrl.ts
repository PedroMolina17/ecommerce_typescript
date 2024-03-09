import { Response, Request, NextFunction } from "express";
import {
  IProductCreate,
  IProductDelete,
  IProductUpdate,
} from "../../types/product.type";
import { ProductsService } from "../../services/products.service";
import registrationError from "../../utils/registrationError.util";
import { sendResponse } from "../../utils/sendResponse.util";
import { HTTP_STATUS } from "../../constants/statusCode.constants";

const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  // Logic to get all products
};

const getProductById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Logic to get a product by ID
};

const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = req.body;
    product.brandId = Number(product.brandId);
    product.categoryId = Number(product.categoryId);
    product.stock = Number(product.stock);
    product.price = Number(product.price);
    product.status = product.status === "true" ? true : false;
    product.promotion = product.promotion === "true" ? true : false;
    product.promotionPrice = Number(product.promotionPrice);
    const data = await ProductsService.createProduct(product);
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
    const {id}=req.params
    const product = req.body as IProductUpdate;
    product.id = Number(id);
    const data = await ProductsService.updateProduct(product);
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};

const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const product = req.body as IProductDelete;
    const data = await ProductsService.deleteProduct(product);
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
