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
const router = Router();
router.get("/brands", getBrands);
router.post("/create-brand", validateCreateBrand, createBrand);
router.put("/update-brand/:id", validateUpdateBrand, updateBrand);
router.delete("/delete-brand/:id", validateDeleteBrand, deleteBrand);
export default router;
