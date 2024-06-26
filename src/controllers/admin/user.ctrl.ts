import { Request, Response, NextFunction } from "express";
import { UserService } from "../../services/user.service";
import { sendResponse } from "../../utils/sendResponse.util";
import { HTTP_STATUS } from "../../constants/statusCode.constants";
import registrationError from "../../utils/registrationError.util";
import { CloudinaryService } from "../../services/cloudinary/cloudinary.service";
import { PrismaClient } from "@prisma/client";
type fnCtrl = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

const userService = new UserService(
  new CloudinaryService(),
  new PrismaClient()
);
const getAllUsers: fnCtrl = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);
    console.log(req.cookies);
    const data = await UserService.getAllUsers(pageNumber, pageSizeNumber);
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};

const getUserByName: fnCtrl = async (req, res, next) => {
  try {
    const { name } = req.params;
    const { page = 1, pageSize = 10 } = req.query;
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);
    const data = await UserService.getUserByName({
      userName: name,
      page: pageNumber,
      pageSize: pageSizeNumber,
    });
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};

const updateUserById: fnCtrl = async (req, res, netx) => {
  try {
    const { id } = req.params;
    const user = req.body;
    console.log(user);
    const idUser = Number(id);
    const data = await UserService.updateUserById(idUser, user);
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, netx);
  }
};


const deleteUserById: fnCtrl = async (req, res, next) => {
  try {
    const { id } = req.params;
    const idUser = Number(id);
    const data = await UserService.deleteUserById(idUser);
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export {
  getAllUsers,
  getUserByName,
  updateUserById,
  deleteUserById,
 
};
