// src/controllers/admin/category.ctrl.ts

import { Request, Response, NextFunction } from "express";
import {
  ICreateCategory,
  IDeleteCategory,
  IUpdateCategory,
} from "../../types/category.type";
import { categoryService } from "../../services/category.service";
import registrationError from "../../utils/registrationError.util";
import { sendResponse } from "../../utils/sendResponse.util";
import { HTTP_STATUS } from "../../constants/statusCode.constants";
type fnCtrl = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
const getCategories: fnCtrl = async (req, res, next) => {
  // Logic to get all categories
};

const getCategoryById: fnCtrl = async (req, res, next) => {
  // Logic to get a category by ID
};

const createCategory: fnCtrl = async (req, res, next) => {
  try {
    const category = req.body as ICreateCategory;
    const data = await categoryService.createCategory(category);
    sendResponse(res, HTTP_STATUS.OK, { message: data.message });
  } catch (error) {
    registrationError(error, res, next);
  }
};

const updateCategory: fnCtrl = async (req, res, next) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const category = { id: Number(id), name } as IUpdateCategory;
    const data = await categoryService.updateCategory(category);
    return sendResponse(res, HTTP_STATUS.OK, { message: data.message });
  } catch (error) {
    registrationError(error, res, next);
  }
};

const deleteCategory: fnCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const category = { id: Number(id) } as IDeleteCategory;
    const data = await categoryService.deleteCategory(category);
    sendResponse(res, HTTP_STATUS.OK, { message: data.message });
  } catch (error) {
    registrationError(error, res, next);
  }
};

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
