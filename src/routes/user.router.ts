import { NextFunction, Request, Response, Router } from "express";
import {
  deleteUserById,
  getAllUsers,
  getUserByName,
  updateUserById,
} from "../controllers/admin/user.ctrl";
import { verifyJwt } from "../middlewares/verifyJwt.mdl";
import { verifyAuthRole } from "../middlewares/verifyAuthRole.mdt";
import { ROLE } from "../constants/roleUser.constants";
import { upload } from "../configs/multer.config";
const router = Router();
router.get("/users", verifyJwt, verifyAuthRole([ROLE.ADMIN]), getAllUsers);
router.get(
  "/users/:name",
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN]),
  getUserByName
);
router.put(
  "/:id",
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN]),
  upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body.image = req.file?.path;
    next();
  },
  updateUserById
);
router.delete("/:id", verifyJwt, verifyAuthRole([ROLE.ADMIN]), deleteUserById);
export default router;
