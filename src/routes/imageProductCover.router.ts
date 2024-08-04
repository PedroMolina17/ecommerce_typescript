import { Router } from "express";
import {
  getAllImageProductCovers,
  getAllImageProductCoverByProductId,
} from "../controllers/ImgProductCover.ctrl";
import {
  createImageProductCover,
  updateImageProductCover,
} from "../controllers/admin/imgProductCover.ctrl";
import { verifyJwt } from "../middlewares/verifyJwt.mdl";
import { verifyAuthRole } from "../middlewares/verifyAuthRole.mdt";
import { ROLE } from "../constants/roleUser.constants";
import { upload } from "../configs/multer.config";

const router = Router();

router.get("/get-all-img-cover", getAllImageProductCovers);
router.get(
  "/:productId/get-all-img-cover",

  getAllImageProductCoverByProductId
);
router.post(
  "/:productId/create-img-cover",
  upload.fields([{ name: "imageProductCover" }]),
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN]),
  createImageProductCover
);
router.put(
  "/update-img-cover",
  upload.fields([{ name: "imageProductCover" }]),
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN]),
  updateImageProductCover
);
export default router;
