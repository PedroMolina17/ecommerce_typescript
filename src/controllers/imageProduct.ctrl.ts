import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/statusCode.constants";
import { sendResponse } from "../utils/sendResponse.util";
import registrationError from "../utils/registrationError.util";
import { ImageProductService } from "../services/imageProduct.service";
import { PrismaClient } from "@prisma/client";
import { CloudinaryService } from "../services/cloudinary/cloudinary.service";
import { processFiles } from "../utils/processFIles.util";


type fnCtrl = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const imageProductService = new ImageProductService(
  new PrismaClient(),
  new CloudinaryService()
);
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
  next
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

export const createImageProduct: fnCtrl = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    const images = req.files 
    const files =processFiles(images)
    
    const message = await imageProductService.createImageProduct(productId,files.imageProducts);
    sendResponse(res, HTTP_STATUS.OK, message);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export const updateImageProduct: fnCtrl = async (req, res, next) => {
  try {
    const imagesOldId = JSON.parse(req.body.imagesOldId)
    const files= req.files
    const images = processFiles(files).imageProducts
   const message = await imageProductService.updateImageProduct(images,imagesOldId);
    sendResponse(res, HTTP_STATUS.CREATED, message);
  } catch (error) {
    console.log(error)
    registrationError(error, res, next);
  }
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
    const message = await imageProductService.deleteAllImageProductsByProductId(
      productId
    );
    sendResponse(res, HTTP_STATUS.OK, message);
  } catch (error) {
    registrationError(error, res, next);
  }
};
