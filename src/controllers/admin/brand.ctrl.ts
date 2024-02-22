import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../../constants/statusCode.constants";
import registrationError from "../../utils/registrationError.util";
import { sendResponse } from "../../utils/sendResponse.util";
import { ICreateBrand, IDeleteBrand, IUpdateBrand } from "../../types/brand.type";
import { BrandService } from "../../services/brand.service";
type fnCtrl = (req: Request, res: Response, next: NextFunction) => Promise<void>;
const createBrand: fnCtrl = async (req, res, next) => {
    try {
        const brand = req.body as ICreateBrand
        const data = await BrandService.createBrand(brand)
        sendResponse(res, HTTP_STATUS.OK, { message: data.message })
    } catch (error) {
        registrationError(error, res, next);
    }
}

const updateBrand: fnCtrl = async (req, res, next) => {
    try {
        const brand = req.body as IUpdateBrand
        const data = await BrandService.updateBrand(brand)
        sendResponse(res, HTTP_STATUS.OK, { message: data.message })
    } catch (error) {
        registrationError(error, res, next);
    }
}

const deleteBrand: fnCtrl = async (req, res, next) => {
    try {
        const brand = req.body as IDeleteBrand
        const data = await BrandService.deleteBrand(brand)
        sendResponse(res, HTTP_STATUS.OK, { message: data.message })
    } catch (error) {
        registrationError(error, res, next);
    }
}
export { createBrand, updateBrand, deleteBrand }