import { Router } from "express";
import { createCategory,deleteCategory,updateCategory } from "../controllers/admin/category.ctrl";
const router = Router()
router.post('/create-category', createCategory)
router.put('/update-category', updateCategory)
router.delete('/delete-category', deleteCategory)
export default router