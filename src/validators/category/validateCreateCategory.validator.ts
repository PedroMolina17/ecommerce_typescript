import { check } from "express-validator";
import { validateResult } from "../../middlewares/validateResult.mdl";
import { NextFunction, Request, Response } from "express";

export const validateCreateCategory =[
    check("name")
    .not()
    .isEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),

    (req: Request, res: Response, next: NextFunction) => {
        validateResult(req, res, next);
    },
]