import { Request, Response } from "express";
import calculateDates from "../utils/functions/getDateQueryParams";
import RentalItem from "../models/Rental.model";
import RentalOrder from "../models/RentalOrder.model";
import { Op } from "sequelize";

export class RentalStatsController {
  static getAllRentalItem = async (req: Request, res: Response) => {
    try {
      /** state management */
      const { date: dateParam } = req.params;

      const { startDate, endDate } = dateParam
        ? calculateDates(dateParam)
        : { startDate: new Date(), endDate: new Date() };

      // Fetch all inventory items (or filter by date if dateParam exists)
      const query = {
        where: dateParam
          ? {
              createdAt: {
                [Op.gte]: startDate,
                [Op.lt]: endDate,
              },
            }
          : {},
      };

      const rentalCount = await RentalItem.count(query);

      res.status(200).json({
        data: {
          total: rentalCount,
        },
        success: true,
      });
    } catch (error: any) {
      console.log(`Error: ${error}`);
      res.status(500).json({
        message: `Error: ${error}`,
        success: false,
      });
    }
  };

  static async getRentalIncome(req: Request, res: Response) {
    try {
      const { date: dateParam } = req.params;

      // Handle date parameters based on the provided value
      const { startDate, endDate } = dateParam
        ? calculateDates(dateParam)
        : { startDate: new Date(), endDate: new Date() };

      // Fetch rental orders (filtered by date and finance_status)
      const query = {
        where: {
          ...(dateParam && {
            // Include date filter if dateParam exists
            createdAt: {
              [Op.gte]: startDate,
              [Op.lt]: endDate,
            },
          }),
          finance_status: "paid", // Filter by finance_status
        },
      };

      const rentalOrders = await RentalOrder.findAll(query);

      // Calculate total income (sum of rental orders' totalPrice)
      const totalIncome = rentalOrders.reduce(
        (acc: any, order: any) => acc + order.total,
        0
      );

      // Prepare and return the response
      const response = {
        data: {
          total: totalIncome,
        },
      };

      res.json({ response, success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error fetching rental income", success: false });
    }
  }

  static async getTotalRentalOrders(req: Request, res: Response) {
    try {
      const { date: dateParam } = req.params;

      // Handle date parameters based on the provided value
      const { startDate, endDate } = dateParam
        ? calculateDates(dateParam)
        : { startDate: new Date(), endDate: new Date() };

      // Fetch rental orders (filtered by date and finance_status)
      const query = {
        where: {
          ...(dateParam && {
            // Include date filter if dateParam exists
            createdAt: {
              [Op.gte]: startDate,
              [Op.lt]: endDate,
            },
          }),
        },
      };

      const rentalOrders = await RentalOrder.count(query);

      const response = {
        data: {
          total: rentalOrders,
        },
      };

      res.json(response);
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error fetching rental income", success: false });
    }
  }

  static async getRentalItemOutOfStock(req: Request, res: Response) {
    try {
      const { date: dateParam } = req.params;

      // Handle date parameters based on the provided value
      const { startDate, endDate } = dateParam
        ? calculateDates(dateParam)
        : { startDate: new Date(), endDate: new Date() };

      const query = {
        where: {
          ...(dateParam && {
            // Include date filter if dateParam exists
            createdAt: {
              [Op.gte]: startDate,
              [Op.lt]: endDate,
            },
          }),
          quantity: 0,
        },
      };

      const rentalItems = await RentalItem.count(query);

      // Prepare and return the response
      const response = {
        data: {
          total: rentalItems,
        },
      };

      res.json({ response, success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error fetching rental income", success: false });
    }
  }
}
