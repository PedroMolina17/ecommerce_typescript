import { Response } from "express";
import { AUTH } from "../constants";
interface ICookie {
  accessToken: string;
  refreshToken: string;
}
export const setCookies = (res: Response, data: ICookie): void => {
  res.cookie(AUTH.REFRESHTOKEN, data.refreshToken, {
    httpOnly: false,
    maxAge: 7 * 60 * 60 * 1000,
  });
  res.cookie(AUTH.ACCESSTOKEN, data.accessToken, {
    httpOnly: false,
    maxAge: 24 * 60 * 60 * 1000,
  });
};
