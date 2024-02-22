import { Request, Response } from "express";
import UserLog from "../models/UserLogs.model";

export class UserLogsController {
  /** Get all user logs */
  static getAllUserLogs = async (req: Request, res: Response) => {
    try {
      const userLogs = await UserLog.findAll();
      res.json({ data: userLogs, success: true });
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Error: " + error.message);
    }
  };

  /** Get all a single user logs */
  static getAllSingleUserLogs = async (req: Request, res: Response) => {
    try {
      const userLogs = await UserLog.findAll({
        where: {
          user: {
            id: req.params.id,
          },
        },
      });
      res.json({
        data: userLogs,
        success: true,
      });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  };
}
