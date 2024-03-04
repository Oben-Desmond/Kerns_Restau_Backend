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

  /**
   * Get purchase order of an particular Item passing item_id
   */
  static getRentalOrderByItemId = async (req: Request, res: Response) => {
    try {
      const rentalOrder = await RentalOrder.findAll({
        where: {
          item_id: req.params.id,
        },
      });

      if (!rentalOrder) {
        return res.status(404).json({
          message: "Rental order not found",
          success: false,
        });
      }

      res.json({
        data: rentalOrder,
        success: true,
      });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).json({
        message: "Server error: " + error.message,
        success: false,
      });
    }
  };

  //create rental Order
  static createRentalOrder = async (req: Request, res: Response) => {
    try {
      const rentalOrder = await RentalOrder.create(req.body);
      res.json({ data: rentalOrder, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).json({
        message: `Server Error: ${err.message}`,
        success: false,
      });
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
