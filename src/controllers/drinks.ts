import { Request, Response } from "express";
import Drink from "../models/Drink.model";

export class DrinkController {
  //get all drinks
  static getDrinks = async (req: Request, res: Response) => {
    try {
      const drinks = await Drink.findAll();
      res.json({ data: drinks, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({
        message: `Error: ${err.message}`,
        success: false,
      });
    }
  };

  //get drink by id
  static getDrinkById = async (req: Request, res: Response) => {
    try {
      const drink = await Drink.findByPk(req.params.id);
      if (!drink) {
        return res
          .status(404)
          .json({ message: "drink not found", success: false });
      }
      res.json({ data: drink, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({
        message: `Error: ${err.message}`,
        success: false,
      });
    }
  };

  //create drink
  static createDrink = async (req: Request, res: Response) => {
    try {
      const drink = await Drink.create(req.body);
      res.json({ data: drink, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({
        message: `Error: ${err.message}`,
        success: false,
      });
    }
  };

  //update drink
  static updateDrink = async (req: Request, res: Response) => {
    try {
      const drink = await Drink.findByPk(req.params.id);
      if (!drink) {
        return res
          .status(404)
          .json({ message: "Drink not found", success: false });
      }
      await drink.update(req.body);
      res.json(drink);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({
        message: `Error: ${err.message}`,
        success: false,
      });
    }
  };

  //delete drink
  static deleteDrink = async (req: Request, res: Response) => {
    try {
      const drink = await Drink.findByPk(req.params.id);
      if (!drink) {
        return res
          .status(404)
          .json({ message: "Drink not found", success: false });
      }
      await drink.destroy();
      res.json({ message: "Drink removed", success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({
        message: `Error: ${err.message}`,
        success: false,
      });
    }
  };
}
