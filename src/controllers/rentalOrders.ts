import { Request, Response } from "express";
import RentalOrder from "../models/RentalOrder.model";

// rental orders controller
export class RentalOrdersController {
  //get all orders
  static getRentalOrders = async (req: Request, res: Response) => {
    try {
      const orders = await RentalOrder.findAll();
      res.json({ data: orders, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  //get rental Order by id
  static getRentalOrderById = async (req: Request, res: Response) => {
    try {
      const rentalOrder = await RentalOrder.findByPk(req.params.id);

      if (!rentalOrder) {
        return res
          .status(404)
          .json({ message: "Rental Order not found", success: false });
      }

      res.json({ data: rentalOrder, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  //create rental Order
  static createRentalOrder = async (req: Request, res: Response) => {
    try {
      const rentalOrder = await RentalOrder.create(req.body);
      res.send({ data: rentalOrder, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  //update rental Order
  static updateRentalOrder = async (req: Request, res: Response) => {
    try {
      const rentalOrder = await RentalOrder.findByPk(req.params.id);
      if (!rentalOrder) {
        return res
          .status(404)
          .json({ message: "Rental Order not found", success: false });
      }
      await rentalOrder.update(req.body);
      res.json({ data: rentalOrder, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };

  //delete rental Order
  static deleteRentalOrder = async (req: Request, res: Response) => {
    try {
      const rentalOrder = await RentalOrder.findByPk(req.params.id);
      if (!rentalOrder) {
        return res
          .status(404)
          .json({ message: "Rental Order not found", success: false });
      }
      await rentalOrder.destroy();
      res.json({ message: "Rental Order removed", success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };
}
