import { NextFunction, Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { RatingService } from "../services/rating.service";
import { sendResponse } from "../utils/sendResponse.util";
import { HTTP_STATUS } from "../constants/statusCode.constants";
import registrationError from "../utils/registrationError.util";
const ratingService = new RatingService(new PrismaClient());
type fnCtrl = (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => Promise<void>;

export const createRating: fnCtrl = async (req, res, next) => {
    try {
        const data = await ratingService.createRating(req.body);
        sendResponse(res, HTTP_STATUS.OK, data);
    } catch (error) {
        registrationError(error, res, next);
    }
}

export const updateRating: fnCtrl = async (req, res, next) => {
    try {
        const data = await ratingService.updateRating(req.body);
        sendResponse(res, HTTP_STATUS.OK, data);
    } catch (error) {
        registrationError(error, res, next);
    }
}

export const getRatingByProductId: fnCtrl = async (req, res, next) => {
    try {
        const productId = Number(req.params.productId);
        const data = await ratingService.getRatingByProductId(productId);
        sendResponse(res, HTTP_STATUS.OK, data);
    } catch (error) {
        registrationError(error, res, next);
    }
}

