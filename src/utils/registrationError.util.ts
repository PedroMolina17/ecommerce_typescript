import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Response } from "express";
import { ERROR } from "../constants/errorName.constants";
import CustomError from "../errors/customError.error";
import { TokenExpiredError } from "jsonwebtoken";
import { AUTH } from "../constants";

const registrationError = (error: any, res: Response, next: NextFunction) => {
  if (error instanceof PrismaClientKnownRequestError) {
    console.error("Error conocido de Prisma:",{error:error});
    if(error.meta?.modelName==="Token" && error.code==="P2025"){
      res.clearCookie(AUTH.REFRESHTOKEN)
      res.clearCookie(AUTH.ACCESSTOKEN)
      
      return res.status(401).json({ error: "Error al procesar la solicitud." });
    }
    return res.status(500).json({ error: "Error al procesar la solicitud." });
  }

  if (error instanceof CustomError && error.name === ERROR.CLIENT_ERROR) {
    console.error("Error personalizado:", error.message);
    console.log("esty aca-->", error.name);
    return next(error);
  }
  if (error instanceof TokenExpiredError) {
    console.error("Error personalizado:", error.message);
    return next(error);
  }
  console.error("Error desconocido:", error);
  return res.status(500).json({ error: "Error al procesar la solicitud." });
};
export default registrationError;
