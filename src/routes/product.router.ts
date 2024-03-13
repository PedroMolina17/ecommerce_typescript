import { NextFunction, Request, Response, Router } from "express";
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/admin/products.ctrl";
import { upload } from "../configs/multer.config";
import { validateFieldCreateProduct } from "../validators/fieldCreateProduct.validator";
import { getAllProductsPaginated } from "../controllers/product.ctrl";
import { verifyAuthRole } from "../middlewares/verifyAuthRole.mdt";
import { verifyJwt } from "../middlewares/verifyJwt.mdl";
import { ROLE } from "../constants/roleUser.constants";
const router = Router();
router.get(
  "/products",
  verifyJwt,
  getAllProductsPaginated
);

router.post(
  "/create-product",
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN]),
  upload.single("image"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body.image = req.file?.path;
    next();
  },
  validateFieldCreateProduct,
  createProduct
);
router.put(
  "/update-product/:id",
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN]),
  updateProduct
);
router.delete(
  "/delete-product/:id",
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN]),
  deleteProduct
);

export default router;
