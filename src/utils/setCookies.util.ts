import { Response } from "express";
interface ICookie {
    accessToken: string, 
    refreshToken: string
}
export const setCookies = (res: Response, data: ICookie):void => {
    res.cookie('refreshToken', data.refreshToken);
    res.cookie('accessToken', data.accessToken);
};