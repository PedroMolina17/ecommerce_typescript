import { Router } from "express";
import { createCategory,deleteCategory,updateCategory } from "../controllers/admin/category.ctrl";
import { getCategories } from "../controllers/category.ctrl";
const router = Router()
router.get('/categories', getCategories)
router.post('/create-category', createCategory)
router.put('/update-category', updateCategory)
router.delete('/delete-category', deleteCategory)
export default router