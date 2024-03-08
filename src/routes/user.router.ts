import {Router} from "express"
import { deleteUserById, getAllUsers, getUserByName, updateUserById } from "../controllers/admin/user.ctrl"
import { verifyJwt } from "../middlewares/verifyJwt.mdl"
import { verifyAuthRole } from "../middlewares/verifyAuthRole.mdt"
import { ROLE } from "../constants/roleUser.constants"
const router = Router()
router.get('/users',verifyJwt,verifyAuthRole([ROLE.ADMIN,ROLE.USER]),getAllUsers)
router.get("/users/:name",verifyJwt,verifyAuthRole([ROLE.ADMIN]),getUserByName)
router.put("/:id",verifyJwt,verifyAuthRole([ROLE.ADMIN]),updateUserById)
router.delete("/:id",verifyJwt,verifyAuthRole([ROLE.ADMIN]),deleteUserById)
export default router