import { NextFunction, Request, Response } from "express";
import InventoryItemLogs from "../models/InventoryLogs.model";

const logInventoryAction = async (req: any, res: Response, logInfo: any) => {
  try {
    const itemName = logInfo?.itemName;
    const itemDescription = logInfo?.description;
    const itemId = logInfo?.itemId;

    await InventoryItemLogs.create({
      name: itemName,
      description: itemDescription,
      item: {
        id: itemId,
        name: itemName,
      },
    });
  } catch (error: any) {
    console.log("Inventory logging error:", error);
  }
};

export default logInventoryAction;
