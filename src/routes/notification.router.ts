import { Router } from "express";
import { getNotifications, markNotificationReadById } from "../controllers/admin/notification.ctrl";
import { verifyJwt } from "../middlewares/verifyJwt.mdl";
import { verifyAuthRole } from "../middlewares/verifyAuthRole.mdt";
import { ROLE } from "../constants/roleUser.constants";
const router: Router = Router();
router.get("/",verifyJwt,verifyAuthRole([ROLE.ADMIN]),getNotifications);
router.put("/:id/mark-as-read", verifyJwt,verifyAuthRole([ROLE.ADMIN]), markNotificationReadById);
export default router;
