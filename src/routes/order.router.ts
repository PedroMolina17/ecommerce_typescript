import { Router } from "express";
import { verifyAuthRole, verifyJwt } from "../middlewares/index";
import { ROLE } from "../constants/roleUser.constants";
import { createOrder,addOrderItem } from "../controllers/order.ctrl";
const router = Router();
router.post(
  "/create-order",
  verifyJwt,
  verifyAuthRole([ROLE.USER, ROLE.ADMIN]),
  createOrder
);

router.post("/add-order-item",verifyJwt,verifyAuthRole([ROLE.USER, ROLE.ADMIN]),addOrderItem)
export default router;
