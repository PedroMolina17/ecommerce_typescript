import { NextFunction, Response } from "express";
import { CustomRequest } from "../../middlewares/verifyAuthRole.mdt";
import { NotificationsService } from "../../services/admin/notifications.service";
import { PrismaClient } from "@prisma/client";
import { sendResponse } from "../../utils/sendResponse.util";
import { HTTP_STATUS } from "../../constants/statusCode.constants";
import registrationError from "../../utils/registrationError.util";

type fnCtrl = (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;
const notificationService = new NotificationsService(new PrismaClient());
  const getNotifications: fnCtrl = async (req, res, next) => {
    try {
        const allNotifications = await notificationService.getNotifications();
        sendResponse(res, HTTP_STATUS.OK, allNotifications);
    } catch (error) {
        registrationError(error, res, next);
    }
}
export {getNotifications}