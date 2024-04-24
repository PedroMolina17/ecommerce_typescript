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
import { io } from "../..";
import { NotificationsService } from "../../services/admin/notifications.service";
import { PrismaClient } from "@prisma/client";
import { CustomRequest } from "../../middlewares/verifyAuthRole.mdt";
type fnCtrl = (
  req: CustomRequest,
  res: Response,
  next: NextFunction,
) => Promise<void>;
const notificationService = new NotificationsService(new PrismaClient());
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
    0;
    const notification = await notificationService.createNotification({
      message: `A new category ${data.data.name} has been created`,
      userId: req.user.user.id,
    });

    io.emit("notification", notification);
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
    const notification = await notificationService.createNotification({
      message: `The category ${data.data.name} has been updated`,
      userId: req.user.user.id,
    });
    io.emit("notification", notification);
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
    const notification = await notificationService.createNotification({
      message: `The category ${data.data.name} has been deleted`,
      userId: req.user.user.id,
    });
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
