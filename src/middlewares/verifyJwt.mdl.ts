import { NextFunction, Request, Response } from "express";
import  Jwt  from "jsonwebtoken";
import registrationError from "../utils/registrationError.util";
import ClientError from "../errors/clientError.error";
import { HTTP_STATUS } from "../constants/statusCode.constants";
import { DecodedTokenUser } from "../types/auth.type";
import { CustomRequest } from "./verifyAuthRole.mdt";
export const verifyJwt = (req:CustomRequest,res:Response,next:NextFunction) => {
    try {
        const token= req.cookies.accessToken
        console.log(token)
        if(!token) throw new ClientError("unauthorized", HTTP_STATUS.UNAUTHORIZED)
        const decoded = Jwt.verify(token, process.env.ACCESS_SECRET_TOKEN!)
        req.user = decoded
        console.log("req--->",decoded)
        next()
    
    } catch (error) {
        registrationError(error, res, next);
    }
}