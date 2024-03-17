import { Response, NextFunction } from "express";
import { CustomRequest } from "../../../middlewares/verifyAuthRole.mdt";
import { ILoginAdmin, IRegisterAdmin } from "../../../types/auth.type";
import { AuthService } from "../../../services/auth.service";
import { sendResponse } from "../../../utils/sendResponse.util";
import { HTTP_STATUS } from "../../../constants/statusCode.constants";
import registrationError from "../../../utils/registrationError.util";
import { setCookies } from "../../../utils/setCookies.util";
import { AUTH } from "../../../constants";
type AuthFunction = (req: CustomRequest, res: Response, next: NextFunction) => Promise<any>;
const registerAdmin:AuthFunction = async (req,res,next)=>{
    try {
        const user:IRegisterAdmin = req.body
        const data = await AuthService.registerAdmin(user)
        setCookies(res,data)
        sendResponse(res,HTTP_STATUS.OK,{message:data.message})
    } catch (error) {
        registrationError(error, res, next);
    }
}

const loginAdmin:AuthFunction = async (req,res,next)=>{
    try {
        const user:ILoginAdmin = req.body
        const data = await AuthService.loginAdmin(user)
        setCookies(res,data)
        sendResponse(res,HTTP_STATUS.OK,{message:data.message})
    } catch (error) {
        registrationError(error, res, next);
    }
}

const logoutAdmin:AuthFunction = async (req,res,next)=>{
    try {
        const {user}=req.user
        const data = await AuthService.logoutAdmin(user)
        res.clearCookie(AUTH.ACCESSTOKEN)
        res.clearCookie(AUTH.REFRESHTOKEN)
        sendResponse(res,HTTP_STATUS.OK,{...data})
    } catch (error) {
        registrationError(error, res, next);
    }
}
const checkAuthAdmin:AuthFunction = async (req,res,next)=>{
    try {
        const user = req.user
        const data={
            authenticate:true,
            ...user
        }
        sendResponse(res,HTTP_STATUS.OK,data)
    } catch (error) {
        registrationError(error, res, next);
    }
}
export{registerAdmin,loginAdmin,logoutAdmin,checkAuthAdmin}