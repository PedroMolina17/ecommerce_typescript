import { Router } from "express";
import { verifyAuthRole, verifyJwt } from "../middlewares/index";
import { ROLE } from "../constants/roleUser.constants";
import {
  createOrder,
  addOrderItem,
  getOrderByUserId,
  deleteOrderByOrderId,
  UpdateOrderItemByOrderItemId,
} from "../controllers/order.ctrl";
const router = Router();
router.post(
  "/create-order",
  verifyJwt,
  verifyAuthRole([ROLE.USER, ROLE.ADMIN]),
  createOrder
);

router.post(
  "/add-order-item",
  verifyJwt,
  verifyAuthRole([ROLE.USER, ROLE.ADMIN]),
  addOrderItem
);

router.get(
  "/get-order/:userId",
  verifyJwt,
  verifyAuthRole([ROLE.USER, ROLE.ADMIN]),
  getOrderByUserId
);

router.delete(
  "/delete-order/:orderId",
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN, ROLE.USER]),
  deleteOrderByOrderId
);

router.put(
  "/update-order-item/:orderItemId",
  verifyJwt,
  verifyAuthRole([ROLE.USER, ROLE.ADMIN]),
  UpdateOrderItemByOrderItemId
);
export default router;
