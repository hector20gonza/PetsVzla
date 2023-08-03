import { Router } from "express";
import { rendernotifications } from '../controller/notifications.controller.js'
 const router = Router();
   router.get("/notifications/notification",rendernotifications);

export default router;