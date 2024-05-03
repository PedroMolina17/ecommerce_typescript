import { Router } from "express";
import { upload } from "../configs/multer.config";
import { verifyJwt } from "../middlewares/verifyJwt.mdl";
import { verifyAuthRole } from "../middlewares/verifyAuthRole.mdt";
import { ROLE } from "../constants/roleUser.constants";
import { getAllImageProductsByProductId, getImageProductById} from "../controllers/imageProduct.ctrl";
const router = Router();
router.get(
  "/get-all-img-product/:productId",
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN, ROLE.USER]),
  getAllImageProductsByProductId
);
router.get("/image-product/:imageId", verifyJwt, verifyAuthRole([ROLE.ADMIN]), getImageProductById);
export default router;
