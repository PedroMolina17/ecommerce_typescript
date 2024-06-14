import { Router } from "express";
import { verifyJwt } from "../middlewares/verifyJwt.mdl";
import { verifyAuthRole } from "../middlewares/verifyAuthRole.mdt";
import { ROLE } from "../constants/roleUser.constants";
import {
  getRatingByProductId,
  createRating,
  updateRating,
} from "../controllers/rating.ctrl";
const router = Router();

router.get(
  "/get-rating-by-product/:productId",
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN, ROLE.USER]),
  getRatingByProductId
);

router.post(
  "/create-rating",
  verifyJwt,
  verifyAuthRole([ROLE.USER, ROLE.ADMIN]),
  createRating
);

router.put(
  "/update-rating",
  verifyJwt,
  verifyAuthRole([ROLE.USER, ROLE.ADMIN]),
  updateRating
);
export default router;
