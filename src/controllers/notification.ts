import { Request, Response } from "express";
import Notification from "../models/Notification.model";

export class NotificationController {
  static getAllNotifications = async (req: Request, res: Response) => {
    try {
      const notifications = await Notification.findAll();
      res.status(200).json({
        data: notifications,
        success: true,
      });
    } catch (error: any) {
      console.log("Error", error.message);
      res.status(500).json({
        message: `Error: ${error.message}`,
        success: false,
      });
    }
  };

  static updateNotification = async (req: Request, res: Response) => {
    try {
      const notification = await Notification.findByPk(req.params.id);

      if (!notification) {
        return res.status(404).json({
          message: "Notification not found",
          success: false,
        });
      }

      notification.update(req.body);
      res.status(200).json({
        data: notification,
        success: true,
      });
    } catch (error: any) {
      console.log("Error:", error.message);
      res.status(500).json({
        message: `Error: ${error.message}`,
        success: false,
      });
    }
  };

  static deleteNotification = async (req: Request, res: Response) => {
    try {
      const notification = await Notification.findByPk(req.params.id);

      if (!notification) {
        return res.status(404).json({
          message: "Notification not Found!",
          success: false,
        });
      }

      notification.destroy();

      res.status(200).json({
        message: "Notification deleted!",
        success: true,
      });
    } catch (error: any) {
      console.log("Error:", error.message);
      res.status(500).json({
        message: `Error: ${error.message}`,
        success: false,
      });
    }
  };
}
