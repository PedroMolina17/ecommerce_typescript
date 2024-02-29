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
const router = Router();
router.get("/categories", getCategories);
router.post("/create-category", validateCreateCategory, createCategory);
router.put("/update-category/:id", validateUpdateCategory, updateCategory);
router.delete("/delete-category/:id", validateDeleteCategory, deleteCategory);
export default router;
