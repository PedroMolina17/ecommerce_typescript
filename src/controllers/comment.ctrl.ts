import { PrismaClient } from "@prisma/client";
import { CommentService } from "../services/comment.service";
import { fnCtrl } from "../types/types";
import registrationError from "../utils/registrationError.util";
import { sendResponse } from "../utils/sendResponse.util";
import { HTTP_STATUS } from "../constants/statusCode.constants";

const commenService = new CommentService(new PrismaClient());

export const createComment: fnCtrl = async (req, res, next) => {
  try {
    const comment = req.body as {
      userId: number;
      productId: number;
      comment: string;
    };
    const data = await commenService.createComment(comment);
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export const updateComment: fnCtrl = async (req, res, next) => {
  try {
    const comment = req.body as {
     commentId: number;
      comment: string;
    };
    const data = await commenService.updateComment(comment);
    sendResponse(res, HTTP_STATUS.OK, data);
  } catch (error) {
    registrationError(error, res, next);
  }
};

export const deleteComment: fnCtrl = async (req, res, next) => {
    try {
        const id = Number(req.params.commentId)
        const data = await commenService.deleteComment(id);
        sendResponse(res, HTTP_STATUS.OK, data);
    } catch (error) {
        registrationError(error, res, next);
    }
} 

export const getCommentByProductId: fnCtrl = async (req, res, next) => {
    try {
        const productId = Number(req.params.productId);
        const data = await commenService.getCommentsByProductId(productId);
        sendResponse(res, HTTP_STATUS.OK, data);
    } catch (error) {
        registrationError(error, res, next);
    }
}
