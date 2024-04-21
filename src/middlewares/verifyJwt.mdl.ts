import { NextFunction, Request, Response } from "express";
import Jwt from "jsonwebtoken";
import registrationError from "../utils/registrationError.util";
import ClientError from "../errors/clientError.error";
import { HTTP_STATUS } from "../constants/statusCode.constants";
import { DecodedTokenUser } from "../types/auth.type";
import { CustomRequest } from "./verifyAuthRole.mdt";
export const verifyJwt = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { accessToken, refreshToken } = req.cookies;

    console.log(accessToken);
    if (!accessToken || !refreshToken) {
      console.error("no existe token o refresh");
      throw new ClientError("unauthorized", HTTP_STATUS.UNAUTHORIZED);
    }
    const decodedToken = Jwt.verify(
      accessToken,
      process.env.ACCESS_SECRET_TOKEN!,
    );
    req.user = decodedToken;
    console.log("req--->", decodedToken);
    next();
  } catch (error) {
    registrationError(error, res, next);
  }
};
