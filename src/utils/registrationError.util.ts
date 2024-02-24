import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { NextFunction, Response } from "express";
import { ERROR } from "../constants/errorName.constants";
import CustomError from "../errors/customError.error";

const registrationError = (
  error: any,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof PrismaClientKnownRequestError) {
    console.error("Error conocido de Prisma:",{error:error.message});
    return res.status(500).json({ error: "Error al procesar la solicitud." });
  }

  if (error instanceof CustomError && error.name === ERROR.CLIENT_ERROR) {
    console.error("Error personalizado:", error.message);
    console.log("esty aca-->", error.name);
    return next(error);
  }

  console.error("Error desconocido:", error);
  return res.status(500).json({ error: "Error al procesar la solicitud." });
};
export default registrationError;