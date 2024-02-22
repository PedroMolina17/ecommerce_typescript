import {Router} from "express"
import { createProduct, deleteProduct, updateProduct } from "../controllers/admin/products.ctrl"
const router = Router()

router.post("/create-product", createProduct)
router.put("/update-product", updateProduct)
router.delete("/delete-product", deleteProduct)

export default router