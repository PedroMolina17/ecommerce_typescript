import { Request, Response, NextFunction } from "express";

import { PrismaClient } from "@prisma/client";
import { UserService } from "../services/user.service";
import { CloudinaryService } from "../services/cloudinary/cloudinary.service";
import { sendResponse } from "../utils/sendResponse.util";
import registrationError from "../utils/registrationError.util";
import { HTTP_STATUS } from "../constants/statusCode.constants";
 type fnCtrl = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const userService = new UserService(
  new CloudinaryService(),
  new PrismaClient()
);

export const updatePictureProfileUserByUserId: fnCtrl = async (
  req,
  res,
  next
) => {
  try {
    const userId = Number(req.params.userId);
    const picture = req.body.image;
    const data = await userService.updatePictureProfileUserByUserId(
      userId,
      picture
    );
    console.log("file-->", picture);
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};
