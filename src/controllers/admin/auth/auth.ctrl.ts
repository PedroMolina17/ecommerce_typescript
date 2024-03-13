import { Response, NextFunction } from "express";
import { CustomRequest } from "../../../middlewares/verifyAuthRole.mdt";
import { ILoginAdmin, IRegisterAdmin } from "../../../types/auth.type";
import { AuthService } from "../../../services/auth.service";
import { sendResponse } from "../../../utils/sendResponse.util";
import { HTTP_STATUS } from "../../../constants/statusCode.constants";
import registrationError from "../../../utils/registrationError.util";
import { setCookies } from "../../../utils/setCookies.util";
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
export{registerAdmin,loginAdmin}