import { Router } from "express"
import { createProduct, deleteProduct, updateProduct } from "../controllers/admin/products.ctrl"
import { upload } from "../configs/multer.config"
const router = Router()
router.post("/create-product", upload.single("image"), createProduct)
router.put("/update-product", updateProduct)
router.delete("/delete-product", deleteProduct)

export default router