import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../controllers/admin/category.ctrl";
import { getCategories } from "../controllers/category.ctrl";
import {
  validateCreateCategory,
  validateDeleteCategory,
  validateUpdateCategory,
} from "../validators";
import { verifyJwt } from "../middlewares/verifyJwt.mdl";
import { verifyAuthRole } from "../middlewares/verifyAuthRole.mdt";
import { ROLE } from "../constants/roleUser.constants";
const router = Router();
router.get(
  "/categories",
  verifyJwt,
  getCategories
);
router.post(
  "/create-category",
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN]),
  validateCreateCategory,
  createCategory
);
router.put(
  "/update-category/:id",
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN]),
  validateUpdateCategory,
  updateCategory
);
router.delete(
  "/delete-category/:id",
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN]),
  validateDeleteCategory,
  deleteCategory
);
export default router;
