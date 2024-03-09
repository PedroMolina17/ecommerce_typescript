import { Router } from "express";
import { register,login, checkAuth,logout } from "../controllers/auth.ctrl";
import { validateFieldLogin, validateFieldRegister } from "../validators";
import { verifyJwt } from "../middlewares/verifyJwt.mdl";

const router = Router()
router.get("/check",verifyJwt,checkAuth)
router.post("/register",validateFieldRegister, register)
router.post("/login",validateFieldLogin, login)
router.post("/logout",verifyJwt,logout)
export default router