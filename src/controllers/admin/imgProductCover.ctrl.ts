import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../../constants/statusCode.constants";
import { ImageProductCoverService } from "../../services/admin/imageProductCover.service";
import { CloudinaryService } from "../../services/cloudinary/cloudinary.service";
import { processFiles } from "../../utils/processFIles.util";
import registrationError from "../../utils/registrationError.util";
import { sendResponse } from "../../utils/sendResponse.util";
import ClientError from "../../errors/clientError.error";

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
    // Obtener el ID de la imagen a actualizar y el ID del producto
    const imageId = Number(req.body.imageId);
    const productId = Number(req.params.productId);

    // Procesar archivos
    const imageProductCover = req.files;
    const files = processFiles(imageProductCover);

    // Verificar que se haya recibido al menos una imagen
    if (files.imageProductCover.length === 0 || !imageId) {
      throw new ClientError("No image or ID provided", HTTP_STATUS.BAD_REQUEST);
    }

    // Llamar al servicio para actualizar la imagen
    const message = await imageProductCoverService.updateImageProductCover(
      productId,
      files.imageProductCover[0],
      imageId
    );

    sendResponse(res, HTTP_STATUS.OK, message);
  } catch (error) {
    console.error("Error:", error);
    registrationError(error, res, next);
  }
};
