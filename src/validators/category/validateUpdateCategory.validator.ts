import { check, param } from "express-validator";
import { validateResult } from "../../middlewares/validateResult.mdl";
import { NextFunction, Request, Response } from "express";

export const validateUpdateCategory = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),
  param("id")
    .not()
    .isEmpty()
    .withMessage("id is required")
    .isNumeric()
    .withMessage("id must be a number"),
  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
