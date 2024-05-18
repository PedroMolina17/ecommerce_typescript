import { Router } from "express";
import { verifyJwt, verifyAuthRole } from "../middlewares/index";
import {
  createComment,
  updateComment,
  deleteComment,
  getCommentByProductId,
} from "../controllers/comment.ctrl";
import { ROLE } from "../constants/roleUser.constants";
const router = Router();

router.get(
  "/get-all-comment/:productId",
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN, ROLE.USER]),
  getCommentByProductId
);

router.post(
  "/create-comment",
  verifyJwt,
  verifyAuthRole([ROLE.USER, ROLE.ADMIN]),
  createComment
);

router.put(
  "/update-comment",
  verifyJwt,
  verifyAuthRole([ROLE.USER, ROLE.ADMIN]),
  updateComment
);

router.delete(
  "/delete-comment/:commentId",
  verifyJwt,
  verifyAuthRole([ROLE.USER, ROLE.ADMIN]),
  deleteComment
);

export default router;
