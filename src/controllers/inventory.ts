import { Request, Response } from "express";
import InventoryItem from "../models/InventoryItem.model";

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
  static createInventoryItem = async (req: Request, res: Response) => {
    try {
      const inventoryItem = await InventoryItem.create(req.body);
      res.json({ data: inventoryItem, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  //update InventoryItem
  static updateInventoryItem = async (req: Request, res: Response) => {
    try {
      const inventoryItem = await InventoryItem.findByPk(req.params.id);
      if (!inventoryItem) {
        return res
          .status(404)
          .json({ message: "InventoryItem not found", success: false });
      }
      await inventoryItem.update(req.body);
      res.json(inventoryItem);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  //delete InventoryItem
  static deleteInventoryItem = async (req: Request, res: Response) => {
    try {
      const inventoryItem = await InventoryItem.findByPk(req.params.id);
      if (!inventoryItem) {
        return res
          .status(404)
          .json({ message: "InventoryItem not found", success: false });
      }
      await inventoryItem.destroy();
      res.json({ message: "InventoryItem removed", success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };
}
