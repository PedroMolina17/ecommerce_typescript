import { Request, Response, NextFunction } from "express";
import { TechnicalDetailsProductService } from "../../services/technicalDetailsProduct.service";
import { sendResponse } from "../../utils/sendResponse.util";
import { HTTP_STATUS } from "../../constants/statusCode.constants";
import registrationError from "../../utils/registrationError.util";
import { ICreateTechnicalDetailsProduct } from "../../types/technicalDetailsProduct.type";
type fnCtrl = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
const createTechnicalDetailsProduct: fnCtrl = async (req, res, next) => {
  try {
    const technicalDetailsProduct: ICreateTechnicalDetailsProduct[] = req.body;
    const data =
      await TechnicalDetailsProductService.createTechnicalDetailsProduct(
        technicalDetailsProduct
      );
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};
const getTechnicalDetailsProduct: fnCtrl = async (req, res, next) => {
  try {
    const data = await TechnicalDetailsProductService.getTechnicalDetailsProduct();
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
}
export {createTechnicalDetailsProduct,getTechnicalDetailsProduct}
