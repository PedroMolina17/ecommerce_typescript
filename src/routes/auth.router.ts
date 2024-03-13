import { Router } from "express";
import { register,login, checkAuth,logout } from "../controllers/auth.ctrl";
import { validateFieldLogin, validateFieldRegister } from "../validators";
import { verifyJwt } from "../middlewares/verifyJwt.mdl";
import { loginAdmin, registerAdmin } from "../controllers/admin/auth/auth.ctrl";

const router = Router()
router.get("/check",verifyJwt,checkAuth)
router.post("/register",validateFieldRegister, register)
router.post("/register-admin",validateFieldRegister, registerAdmin)
router.post("/login",validateFieldLogin, login)
router.post("/login-admin",validateFieldLogin, loginAdmin)
router.post("/logout",verifyJwt,logout)
export default router