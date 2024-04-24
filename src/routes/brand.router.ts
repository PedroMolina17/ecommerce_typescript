import { Router } from "express";
import {
  createBrand,
  deleteBrand,
  updateBrand,
} from "../controllers/admin/brand.ctrl";
import { getBrands } from "../controllers/brand.ctrl";
import {
  validateCreateBrand,
  validateDeleteBrand,
  validateUpdateBrand,
} from "../validators";
import { verifyJwt } from "../middlewares/verifyJwt.mdl";
import { verifyAuthRole } from "../middlewares/verifyAuthRole.mdt";
import { ROLE } from "../constants/roleUser.constants";
const router = Router();
router.get("/brands", verifyJwt, getBrands);
router.post(
  "/create-brand",
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN]),
  validateCreateBrand,
  createBrand,
);
router.put(
  "/update-brand/:id",
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN]),
  validateUpdateBrand,
  updateBrand,
);
router.delete(
  "/delete-brand/:id",
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN]),
  validateDeleteBrand,
  deleteBrand,
);
export default router;
