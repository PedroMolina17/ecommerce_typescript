import { NextFunction, Request, Response } from "express";
import { check } from "express-validator";
import { validateResult } from "../middlewares/validateResult.mdl";
export const validateFieldCreateProduct = [
  check("name")
    .not()
    .isEmpty()
    .withMessage("name is required")
    .isString()
    .withMessage("name must be a string"),
  check("description")
    .not()
    .isEmpty()
    .withMessage("description is required")
    .isString()
    .withMessage("description must be a string"),

  check("price")
    .not()
    .isEmpty()
    .withMessage("price is required")
    .isNumeric()

    .withMessage("price must be a number"),
  check("stock")
    .not()
    .isEmpty()
    .withMessage("stock is required")
    .isNumeric()
    .withMessage("stock must be a number"),
  check("status")
    .not()
    .isEmpty()
    .withMessage("status is required")
    .isBoolean()
    .withMessage("status must be a boolean"),
  check("image").not().isEmpty().withMessage("image is required"),
  check("promotion")
    .not()
    .isEmpty()
    .withMessage("promotion is required")
    .isBoolean()
    .withMessage("promotion must be a boolean"),
  check("promotionPrice")
    .not()
    .isEmpty()
    .withMessage("promotionPrice is required")
    .isNumeric()
    .withMessage("promotionPrice must be a number"),
  check("promotionDescription")
    .not()
    .isEmpty()
    .withMessage("promotionDescription is required")
    .isString()
    .withMessage("promotionDescription must be a string"),
  check("categoryId")
    .not()
    .isEmpty()
    .withMessage("categoryId is required")
    .isNumeric()
    .withMessage("categoryId must be a number"),
  check("brandId")
    .not()
    .isEmpty()
    .withMessage("brandId is required")
    .isNumeric()
    .withMessage("brandId must be a number"),

  (req: Request, res: Response, next: NextFunction) => {
    validateResult(req, res, next);
  },
];
