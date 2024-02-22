import { NextFunction, Request, Response } from "express";
import RentalItemLogs from "../models/rentalItemLogs.model";

const logRentalAction = async (req: any, res: Response, logInfo: any) => {
  try {
    const itemName = logInfo?.itemName;
    const itemDescription = logInfo?.description;
    const itemId = logInfo?.itemId;

    await RentalItemLogs.create({
      name: itemName,
      description: itemDescription,
      item: {
        id: itemId,
        name: itemName,
      },
    });
  } catch (error: any) {
    console.log("Rental logging error:", error);
  }
};

export default logRentalAction;
