import { Request, Response, NextFunction } from "express";
import { ILogin, Iregister } from "../types/auth.type";
import { AuthService } from "../services/auth.service";
import registrationError from "../utils/registrationError.util";
import { sendResponse } from "../utils/sendResponse.util";
import { HTTP_STATUS } from "../constants/statusCode.constants";
import { setCookies } from "../utils/setCookies.util";

type AuthFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;

export const register: AuthFunction = async (req, res, next) => {
  try {
    const user = req.body as Iregister
    const data = await AuthService.register(user)
    setCookies(res, data)
    sendResponse(res, HTTP_STATUS.OK, { message: data.message })
  } catch (error) {
    registrationError(error, res, next);
  }
};
export const login: AuthFunction = async (req, res, next) => {
  try {
    const user = req.body as ILogin
    const data = await AuthService.login(user)
    setCookies(res, data)
    sendResponse(res, HTTP_STATUS.OK, { message: data.message })
  } catch (error) {
    registrationError(error, res, next);
  }
};

