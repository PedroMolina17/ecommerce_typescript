import {Router} from "express"
import { deleteUserById, getAllUsers, getUserByName, updateUserById } from "../controllers/admin/user.ctrl"
const router = Router()
router.get('/users',getAllUsers)
router.get("/users/:name",getUserByName)
router.put("/:id",updateUserById)
router.delete("/:id",deleteUserById)
export default router