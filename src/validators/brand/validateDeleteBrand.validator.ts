import { param } from "express-validator";
import { Response, Request, NextFunction } from "express";
import { validateResult } from "../../middlewares/validateResult.mdl";

export const validateDeleteBrand =[
    param("id")
    .not()
    .isEmpty()
    .withMessage("id is required")
    .isNumeric()
    .withMessage("id must be a number"),
    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    },
]