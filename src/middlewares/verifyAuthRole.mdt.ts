import { NextFunction, Request, Response } from "express";
import { HTTP_STATUS } from "../constants/statusCode.constants";
import ClientError from "../errors/clientError.error";
import registrationError from "../utils/registrationError.util";
import { DecodedToken } from "../types/auth.type";
export interface CustomRequest extends Request {
  user?: any;
}
export const verifyAuthRole =
  (role: string[]) =>
  (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const user: DecodedToken = req.user;
      if (!role.includes(user.user.role)) {
        console.error("unauthorized role", user.user.role);
        throw new ClientError("unauthorized", HTTP_STATUS.UNAUTHORIZED);
      }
      next();
    } catch (error: any) {
      registrationError(error, res, next);
    }
  };
