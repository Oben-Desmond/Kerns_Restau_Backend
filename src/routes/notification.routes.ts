import express from "express";
import { NotificationController } from "../controllers/notification";

const router = express.Router();

/** Get all Notifications */
router.get("/", NotificationController.getAllNotifications);

/** Update a notification read property */
router.put("/:id", NotificationController.updateNotification);

/** Delete a notification */
router.delete("/:id", NotificationController.deleteNotification);

export default router;
