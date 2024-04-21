import { NextFunction, Request, Response, Router } from "express";
import fs from "fs-extra";
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
import { optimizeImage } from "../utils/optimizeImage.util";
const router = Router();
router.get("/users", verifyJwt, verifyAuthRole([ROLE.ADMIN]), getAllUsers);
router.get(
  "/users/:name",
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN]),
  getUserByName,
);
router.put(
  "/:id",
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN]),
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    if (req.file) {
      const imageOptimized = await optimizeImage(
        req.file?.path!,
        req.file?.filename!,
        "webp",
        { width: 100, height: 100 },
      );
      fs.unlink(req.file?.path!);
      req.body.image = imageOptimized?.imageFileToPath;
    }
    next();
  },
  updateUserById,
);
router.delete("/:id", verifyJwt, verifyAuthRole([ROLE.ADMIN]), deleteUserById);
export default router;
