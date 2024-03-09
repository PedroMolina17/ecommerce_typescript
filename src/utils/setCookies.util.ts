import { Response } from "express";
import { AUTH } from "../constants";
interface ICookie {
    accessToken: string, 
    refreshToken: string
}
export const setCookies = (res: Response, data: ICookie):void => {
    res.cookie(AUTH.REFRESHTOKEN, data.refreshToken);
    res.cookie(AUTH.ACCESSTOKEN, data.accessToken);
};