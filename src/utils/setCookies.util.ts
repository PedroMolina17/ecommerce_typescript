import { Response } from "express";
interface ICookie {
    accessToken: string, 
    refreshToken: string
}
export const setCookies = (res: Response, data: ICookie) => {
    res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.cookie('accessToken', data.accessToken, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    });
};