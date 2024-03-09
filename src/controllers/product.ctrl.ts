import { Request, Response, NextFunction } from "express";
import { ProductsService } from "../services/products.service";
import { HTTP_STATUS } from "../constants/statusCode.constants";
import { sendResponse } from "../utils/sendResponse.util";
import registrationError from "../utils/registrationError.util";
type fnCtrl = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
const getAllProductsPaginated: fnCtrl = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 20 } = req.query;
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);
    const data = await ProductsService.getAllProductsPaginated(
      pageNumber,
      pageSizeNumber
    );

    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export { getAllProductsPaginated }