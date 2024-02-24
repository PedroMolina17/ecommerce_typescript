import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/admin/products.ctrl";
import { upload } from "../configs/multer.config";
import { validateFieldCreateProduct } from "../validators/fieldCreateProduct.validator";
const router = Router();
router.post(
  "/create-product",
  validateFieldCreateProduct,
  upload.single("image"),
  createProduct
);
router.put("/update-product", updateProduct);
router.delete("/delete-product", deleteProduct);

export default router;
