import { NextFunction, Response } from "express";
import { AUTH } from "../../../constants";
import { HTTP_STATUS } from "../../../constants/statusCode.constants";
import { CustomRequest } from "../../../middlewares/verifyAuthRole.mdt";
import { AuthService } from "../../../services/auth.service";
import { UserService } from "../../../services/user.service";
import { ILoginAdmin, IRegisterAdmin } from "../../../types/auth.type";
import registrationError from "../../../utils/registrationError.util";
import { sendResponse } from "../../../utils/sendResponse.util";
import { setCookies } from "../../../utils/setCookies.util";

type AuthFunction = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => Promise<any>;

const registerAdmin: AuthFunction = async (req, res, next) => {
  try {
    const user: IRegisterAdmin = req.body;
    const data = await AuthService.registerAdmin(user);
    setCookies(res, data);
    sendResponse(res, HTTP_STATUS.OK, { message: data.message });
  } catch (error) {
    registrationError(error, res, next);
  }
};

const loginAdmin: AuthFunction = async (req, res, next) => {
  try {
    const user: ILoginAdmin = req.body;
    const data = await AuthService.loginAdmin(user);
    setCookies(res, data);
    sendResponse(res, HTTP_STATUS.OK, { message: data.message });
  } catch (error) {
    registrationError(error, res, next);
  }
};

const logoutAdmin: AuthFunction = async (req, res, next) => {
  try {
    const { user } = req.user;
    const data = await AuthService.logoutAdmin(user);
    res.clearCookie(AUTH.ACCESSTOKEN);
    res.clearCookie(AUTH.REFRESHTOKEN);
    sendResponse(res, HTTP_STATUS.OK, { ...data });
  } catch (error) {
    registrationError(error, res, next);
  }
};

const checkAuthAdmin: AuthFunction = async (req, res, next) => {
  try {
    const user = req.user;
    const getAdmin = await UserService.getAdminById(user.user.id);

    const data = {
      authenticate: true,
      user: {
        id: user.user.id,
        image: getAdmin?.image,
      },
    };

    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export { checkAuthAdmin, loginAdmin, logoutAdmin, registerAdmin };
