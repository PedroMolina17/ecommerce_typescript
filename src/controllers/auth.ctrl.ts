import { Request, Response, NextFunction } from "express";
import { ILoginUser, IRegisterUser } from "../types/auth.type";
import { AuthService } from "../services/auth.service";
import registrationError from "../utils/registrationError.util";
import { sendResponse } from "../utils/sendResponse.util";
import { HTTP_STATUS } from "../constants/statusCode.constants";
import { setCookies } from "../utils/setCookies.util";
import { CustomRequest } from "../middlewares/verifyAuthRole.mdt";
import { AUTH } from "../constants";

type AuthFunction = (req: CustomRequest, res: Response, next: NextFunction) => Promise<any>;

export const register: AuthFunction = async (req, res, next) => {
  try {
    const user = req.body as IRegisterUser
    console.log(req.cookies)
    const data = await AuthService.register(user)
    setCookies(res, data)
    sendResponse(res, HTTP_STATUS.OK, { message: data.message })
  } catch (error) {
    registrationError(error, res, next);
  }
};
export const login: AuthFunction = async (req, res, next) => {
  try {
    const user = req.body as ILoginUser
    console.log("-->>>",req.cookies)
    const data = await AuthService.login(user)
    
    setCookies(res, data)
    console.log(res.getHeader('Set-Cookie'));

    sendResponse(res, HTTP_STATUS.OK, { message: data.message })
  } catch (error) {
    registrationError(error, res, next);
  }
};

export const logout:AuthFunction = async (req, res, next) => {
  try {
    const {user}=req.user
    console.log(user)
    const data = await AuthService.logout(user)
    res.clearCookie(AUTH.ACCESSTOKEN)
    res.clearCookie(AUTH.REFRESHTOKEN)
    sendResponse(res, HTTP_STATUS.OK, { data })
  } catch (error) {

    registrationError(error, res, next);
    
  }
}
export const checkAuth:AuthFunction = async (req, res, next) => {
  try {
    const user = req.user
    const data={
      authenticate:true,
      ...user
    }
    sendResponse(res, HTTP_STATUS.OK,data)
  } catch (error) {
    registrationError(error, res, next);
  }
};

