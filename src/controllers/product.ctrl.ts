import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/statusCode.constants";
import { sendResponse } from "../utils/sendResponse.util";
import registrationError from "../utils/registrationError.util";
import { ProductService } from "../services/product.service";
type fnCtrl = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;
const getAllProductsPaginated: fnCtrl = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 20 } = req.query;
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);
    const data = await ProductService.getAllProductsPaginated(
      pageNumber,
      pageSizeNumber,
    );

    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};
const getProductById: fnCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productId = Number(id);
    const data = await ProductService.getProductById(productId);
    return sendResponse(res, HTTP_STATUS.OK, { ...data });
  } catch (error) {
    registrationError(error, res, next);
  }
};
export { getAllProductsPaginated, getProductById };
