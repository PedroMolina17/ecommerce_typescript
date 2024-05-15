import { NextFunction, Request, Response } from "express";

export type IdUser = number;
export type EmailUser = string;
export type fnCtrl = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => Promise<void>;
