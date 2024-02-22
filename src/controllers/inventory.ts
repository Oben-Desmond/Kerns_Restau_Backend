import { NextFunction, Request, Response } from "express";
import InventoryItem from "../models/InventoryItem.model";
import logInventoryAction from "../services/inventoryLog.service";

export class InventoryItemController {
  //get all inventoryItem
  static getInventoryItems = async (req: Request, res: Response) => {
    try {
      const iventoryItems = await InventoryItem.findAll();
      res.json({ data: iventoryItems, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  //get menuItem by id
  static getInventoryItemById = async (req: Request, res: Response) => {
    try {
      const inventoryItem = await InventoryItem.findByPk(req.params.id);
      if (!inventoryItem) {
        return res
          .status(404)
          .json({ message: "InventoryItem not found", success: false });
      }
      res.json({ data: inventoryItem, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  //create InventoryItem
  static createInventoryItem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inventoryItem = await InventoryItem.create(req.body);

      const logInfo = {
        itemName: inventoryItem.name,
        itemId: inventoryItem.id,
        description: `${inventoryItem.name} added to inventory`,
      };

      await logInventoryAction(req, res, logInfo);

      res.json({ data: inventoryItem, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  //update InventoryItem
  static updateInventoryItem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inventoryItem = await InventoryItem.findByPk(req.params.id);
      if (!inventoryItem) {
        return res
          .status(404)
          .json({ message: "InventoryItem not found", success: false });
      }
      await inventoryItem.update(req.body);

      const logInfo = {
        itemName: inventoryItem.name,
        itemId: inventoryItem.id,
        description: `${inventoryItem.name} Updated!`,
      };

      await logInventoryAction(req, res, logInfo);

      res.json(inventoryItem);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
      next(err);
    }
  };

  //delete InventoryItem
  static deleteInventoryItem = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const inventoryItem = await InventoryItem.findByPk(req.params.id);
      if (!inventoryItem) {
        return res
          .status(404)
          .json({ message: "InventoryItem not found", success: false });
      }

      const logInfo = {
        itemName: inventoryItem.name,
        itemId: inventoryItem.id,
        description: `${inventoryItem.name} removed from inventory`,
      };

      await logInventoryAction(req, res, logInfo);

      await inventoryItem.destroy();
      res.json({ message: "InventoryItem removed", success: true });

      next();
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
      next(err);
    }
  };
}
