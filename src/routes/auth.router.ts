import { Router } from "express";
import { register,login } from "../controllers/auth.ctrl";
import { validateFieldLogin, validateFieldRegister } from "../validators";

const router = Router()
router.post("/register",validateFieldRegister, register)
router.post("/login",validateFieldLogin, login)
export default router