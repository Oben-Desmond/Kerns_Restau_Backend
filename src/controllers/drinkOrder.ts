import { Request, Response } from "express";
import DrinkOrder from "../models/DrinkOrder.model";

//Drinkorders controller
export class DrinkOrdersController {
  //get all DrinkOrders
  static getDrinkOrders = async (req: Request, res: Response) => {
    try {
      const drinkOrders = await DrinkOrder.findAll();
      res.json({ data: drinkOrders, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({
        message: `Error ${err.message}`,
        success: false,
      });
    }
  };

  //get Drinkorder by id
  static getDrinkOrderById = async (req: Request, res: Response) => {
    try {
      const drinkOrder = await DrinkOrder.findByPk(req.params.id);

      if (!drinkOrder) {
        return res
          .status(404)
          .json({ message: "Drink Order not found", success: false });
      }

      res.json({ data: drinkOrder, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({
        message: `Error ${err.message}`,
        success: false,
      });
    }
  };

  //create Drinkorder
  static createDrinkOrder = async (req: Request, res: Response) => {
    try {
      const drinkOrder = await DrinkOrder.create(req.body);
      res.send({ data: drinkOrder, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({
        message: `Error ${err.message}`,
        success: false,
      });
    }
  };

  //update Drinkorder
  static updateDrinkOrder = async (req: Request, res: Response) => {
    try {
      const drinkOrder = await DrinkOrder.findByPk(req.params.id);
      if (!drinkOrder) {
        return res
          .status(404)
          .json({ message: "Drink Order not found", success: false });
      }
      await drinkOrder.update(req.body);
      res.json({ data: drinkOrder, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({
        message: `Error ${err.message}`,
        success: false,
      });
    }
  };

  //delete Drinkorder
  static deleteDrinkOrder = async (req: Request, res: Response) => {
    try {
      const drinkOrder = await DrinkOrder.findByPk(req.params.id);
      if (!drinkOrder) {
        return res
          .status(404)
          .json({ message: "Drink Order not found", success: false });
      }
      await drinkOrder.destroy();
      res.json({ message: "Drink Order removed", success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({
        message: `Error: ${err.message}`,
        success: false,
      });
    }
  };
}
