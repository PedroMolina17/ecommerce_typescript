import { Router } from "express";
import { register, login, checkAuth, logout } from "../controllers/auth.ctrl";
import { validateFieldLogin, validateFieldRegister } from "../validators";
import { verifyJwt } from "../middlewares/verifyJwt.mdl";
import {
  checkAuthAdmin,
  loginAdmin,
  logoutAdmin,
  registerAdmin,
} from "../controllers/admin/auth/auth.ctrl";
import { verifyAuthRole } from "../middlewares/verifyAuthRole.mdt";
import { ROLE } from "../constants/roleUser.constants";

const router = Router();
router.get("/check", verifyJwt, checkAuth);
router.get(
  "/check-admin",
  verifyJwt,
  verifyAuthRole([ROLE.ADMIN]),
  checkAuthAdmin,
);
router.post("/register", validateFieldRegister, register);
router.post("/register-admin", validateFieldRegister, registerAdmin);
router.post("/login", validateFieldLogin, login);
router.post("/login-admin", validateFieldLogin, loginAdmin);
router.post("/logout", verifyJwt, logout);
router.post("/logout-admin", verifyJwt, logoutAdmin);
export default router;
