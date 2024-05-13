import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCode.constants";
import { ImageProductCoverService } from "../../services/admin/imageProductCover.service";
import { CloudinaryService } from "../../services/cloudinary/cloudinary.service";
import { processFiles } from "../../utils/processFIles.util";
import registrationError from "../../utils/registrationError.util";
import { sendResponse } from "../../utils/sendResponse.util";

const imageProductCoverService = new ImageProductCoverService(
  new PrismaClient(),
  new CloudinaryService()
);

type fnCtrl = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const createImageProductCover: fnCtrl = async (req, res, next) => {
  try {
    const productId = Number(req.params.productId);
    const imageProductCover = req.files;
    const files = processFiles(imageProductCover);
    const message = await imageProductCoverService.createImageProductCover(
      productId,
      files.imageProductCover
    );
    sendResponse(res, HTTP_STATUS.OK, message);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export const updateImageProductCover: fnCtrl = async (req, res, next) => {
  try {
    const imagesOldId = JSON.parse(req.body.imagesOldId);
    const imageProductCover = req.files;
    const files = processFiles(imageProductCover);
    const message = await imageProductCoverService.updateImageProductCover(
      files.imageProductCover,
      imagesOldId
    );
    sendResponse(res, HTTP_STATUS.OK, message);
  } catch (error) {
    registrationError(error, res, next);
  }
};
