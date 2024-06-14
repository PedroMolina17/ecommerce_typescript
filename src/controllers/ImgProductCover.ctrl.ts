import { NextFunction, Request, Response } from "express";
import { ImageProductCoverService } from "../services/imageProductCover.service";
import { PrismaClient } from "@prisma/client";
import { CloudinaryService } from "../services/cloudinary/cloudinary.service";
import registrationError from "../utils/registrationError.util";
import { sendResponse } from "../utils/sendResponse.util";
import { HTTP_STATUS } from "../constants/statusCode.constants";
import { processFiles } from "../utils/processFIles.util";
const imageProductCoverService = new ImageProductCoverService(
  new PrismaClient(),
  new CloudinaryService()
);

type fnCtrl = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const getAllImageProductCovers: fnCtrl = async (req, res, next) => {
  try {
    const imageProductCovers =
      await imageProductCoverService.getAllImageProductCovers();
    sendResponse(res, HTTP_STATUS.OK, { imageProductCovers });
  } catch (error) {
    registrationError(error, res, next);
  }
};

export const getAllImageProductCoverByProductId: fnCtrl = async (
  req,
  res,
  next
) => {
  try {
    const productId = Number(req.params.productId);
    const imageProductCovers =
      await imageProductCoverService.getAllImageProductCoverByProductId(
        productId
      );
    sendResponse(res, HTTP_STATUS.OK, { imageProductCovers });
  } catch (error) {
    registrationError(error, res, next);
  }
};


