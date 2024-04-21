import { Request, Response, NextFunction } from "express";
import registrationError from "../utils/registrationError.util";
import { categoryService } from "../services/category.service";
import { sendResponse } from "../utils/sendResponse.util";
import { HTTP_STATUS } from "../constants/statusCode.constants";
type fnCtrl = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;
const getCategories: fnCtrl = async (req, res, next) => {
  try {
    const data = await categoryService.getCategory();
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};
export { getCategories };
