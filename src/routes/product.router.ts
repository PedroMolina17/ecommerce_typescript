import { NextFunction, Request, Response, Router } from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/admin/products.ctrl";
import { upload } from "../configs/multer.config";
import { validateFieldCreateProduct } from "../validators/fieldCreateProduct.validator";
import { getAllProductsPaginated } from "../controllers/product.ctrl";
const router = Router();
router.get("/products", getAllProductsPaginated);

router.post(
  "/create-product",
  upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body.image = req.file?.path;
    next();
  },
  validateFieldCreateProduct,
  createProduct
);
router.put("/update-product/:id", updateProduct);
router.delete("/delete-product/:id", deleteProduct);

export default router;
