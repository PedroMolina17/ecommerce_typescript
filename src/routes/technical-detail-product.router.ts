import { Router } from "express";
import {
  createTechnicalDetailsProduct,
  getTechnicalDetailsProduct,
} from "../controllers/admin/technicalDetailsProduct.ctrl";
import { verifyJwt } from "../middlewares/verifyJwt.mdl";
import { verifyAuthRole } from "../middlewares/verifyAuthRole.mdt";
import { ROLE } from "../constants/roleUser.constants";
const router = Router();
router.get(
  "/",
  verifyJwt,
  getTechnicalDetailsProduct
);
router.post(
  "/create-technical-detail-product",
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN]),
  createTechnicalDetailsProduct
);

export default router;
