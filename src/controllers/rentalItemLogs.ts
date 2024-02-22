import { Request, Response } from "express";
import InventoryItemLogs from "../models/InventoryLogs.model";
import RentalItemLogs from "../models/rentalItemLogs.model";

export class IventoryLogsController {
  /** Get all items logs */
  static getAllItemsLogs = async (req: Request, res: Response) => {
    try {
      const rentalItemLogs = await RentalItemLogs.findAll();
      res.json({ data: rentalItemLogs, success: true });
    } catch (error: any) {
      console.log(error);
      res.status(500).send("Error: " + error.message);
    }
  };

  /** Get all a single item logs */
  static getAllSingleItemLogs = async (req: Request, res: Response) => {
    try {
      const rentalItemLogs = await RentalItemLogs.findAll({
        where: {
          item: {
            id: req.params.id,
          },
        },
      });
      res.json({
        data: rentalItemLogs,
        success: true,
      });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  };
}
