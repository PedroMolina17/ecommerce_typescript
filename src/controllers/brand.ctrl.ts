import { Request, Response, NextFunction } from "express";
import registrationError from "../utils/registrationError.util";
import { sendResponse } from "../utils/sendResponse.util";
import { HTTP_STATUS } from "../constants/statusCode.constants";
import { BrandService } from "../services/brand.service";
type fnCtrl = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<void>;
const getBrands: fnCtrl = async (req, res, next) => {
  try {
    const data = await BrandService.getBrands();
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};
export { getBrands };
