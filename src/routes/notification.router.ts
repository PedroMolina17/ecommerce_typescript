import { Router } from "express";
import { getNotifications } from "../controllers/admin/notification.ctrl";
import { verifyJwt } from "../middlewares/verifyJwt.mdl";
import { verifyAuthRole } from "../middlewares/verifyAuthRole.mdt";
import { ROLE } from "../constants/roleUser.constants";
const router: Router = Router();
router.get("/",verifyJwt,verifyAuthRole([ROLE.ADMIN]),getNotifications);
export default router;
