import { Request, Response } from "express";
import RentalItem from "../models/Rental.model";

export class RentalItemController {
  //get all RentalItems
  static getRentalItems = async (req: Request, res: Response) => {
    try {
      const rentalItems = await RentalItem.findAll();
      res.json({ data: rentalItems, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  //get RentalItem by id
  static getRentalItemById = async (req: Request, res: Response) => {
    try {
      const rentalItem = await RentalItem.findByPk(req.params.id);
      if (!rentalItem) {
        return res
          .status(404)
          .json({ message: "Rental Item not found", success: false });
      }
      res.json({ data: rentalItem, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  //create RentalItem
  static createRentalItem = async (req: Request, res: Response) => {
    try {
      const rentalItem = await RentalItem.create(req.body);
      res.json({ data: rentalItem, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  //update RentalItem
  static updateRentalItem = async (req: Request, res: Response) => {
    try {
      const rentalItem = await RentalItem.findByPk(req.params.id);
      if (!rentalItem) {
        return res
          .status(404)
          .json({ message: "Rental Item not found", success: false });
      }
      await rentalItem.update(req.body);
      res.json(rentalItem);
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  //delete rentalItem
  static deleteRentalItem = async (req: Request, res: Response) => {
    try {
      const rentalItem = await RentalItem.findByPk(req.params.id);
      if (!rentalItem) {
        return res
          .status(404)
          .json({ message: "Renta lItem not found", success: false });
      }
      await rentalItem.destroy();
      res.json({ message: "Rental Item removed", success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };
}
