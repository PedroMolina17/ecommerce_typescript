import { Request, Response, NextFunction } from "express";
import { UserService } from "../../services/user.service";
import { sendResponse } from "../../utils/sendResponse.util";
import { HTTP_STATUS } from "../../constants/statusCode.constants";
import registrationError from "../../utils/registrationError.util";
type fnCtrl = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const getAllUsers: fnCtrl = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);
    const data = await UserService.getAllUsers(pageNumber, pageSizeNumber);
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export { getAllUsers };
