import { Router } from "express";
import {
  createCart,
  getCartByUserId,
  addCartItem,
  updateCartItem,
} from "../controllers/cart.ctrl";
import { verifyAuthRole, verifyJwt } from "../middlewares/index";
import { ROLE } from "../constants/roleUser.constants";
const router = Router();
router.get(
  "/get-cart/:userId",
  verifyJwt,
  // verifyAuthRole([ROLE.USER]),
  getCartByUserId
);
router.post(
  "/create-cart/:userId",
  verifyJwt,

  createCart
);
router.post(
  "/add-cart-item",
  verifyJwt,
  // verifyAuthRole([ROLE.USER]),
  addCartItem
);
router.put(
  "/update-cart-item",
  // verifyJwt,
  // verifyAuthRole([ROLE.USER]),
  updateCartItem
);
export default router;
