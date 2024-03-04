import { Request, Response } from "express";
import InventoryItemLogs from "../models/InventoryLogs.model";

export class InventoryLogsController {
  /** Get all items logs */
  static getAllItemsLogs = async (req: Request, res: Response) => {
    try {
      const inventoryLogs = await InventoryItemLogs.findAll();
      res.json({ data: inventoryLogs, success: true });
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Error: " + error.message);
    }
  };

  /** Get all a single item logs */
  static getAllSingleItemLogs = async (req: Request, res: Response) => {
    try {
      const inventoryLogs = await InventoryItemLogs.findAll({
        where: {
          item: {
            id: req.params.id,
          },
        },
      });
      res.json({
        data: inventoryLogs,
        success: true,
      });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  };
}
