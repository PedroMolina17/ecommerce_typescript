import {Router} from "express"
import { getAllUsers } from "../controllers/admin/user.ctrl"
const router = Router()
router.get('/users',getAllUsers)
export default router