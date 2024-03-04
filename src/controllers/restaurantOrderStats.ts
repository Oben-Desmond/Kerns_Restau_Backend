import { Request, Response } from "express";
import { Op } from "sequelize";
import calculateDates from "../utils/functions/getDateQueryParams";
import Order from "../models/Order.model";
import { IOrder } from "../types";
import MenuItem from "../models/MenuItem.model";
import * as Sequelize from "sequelize";

export class RestaurantStatsController {
  static getRestaurantOrdersTotalIncome = async (
    req: Request,
    res: Response
  ) => {
    const { date: dateParam } = req.params;

    try {
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
          finance_status: "paid", // Filter by finance_status
        },
      };

      const rentalOrders = await Order.findAll(query);

      // Calculate total income (sum of rental orders' totalPrice)
      const totalIncome = rentalOrders.reduce(
        (acc: any, order: any) => acc + order.total,
        0
      );

      res.json({
        data: {
          total: totalIncome,
        },
        success: true,
      });
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
      res
        .status(500)
        .json({ message: `Error: ${error.message}`, success: false });
    }
  };

  static getRestaurantCompletedOrders = async (req: Request, res: Response) => {
    const { date: dateParam } = req.params;

    try {
      // Handle date parameters based on the provided value
      const { startDate, endDate } = dateParam
        ? calculateDates(dateParam)
        : { startDate: new Date(), endDate: new Date() };

      const query = {
        where: {
          ...(dateParam && {
            createdAt: {
              [Op.gte]: startDate,
              [Op.lt]: endDate,
            },
          }),
          finance_status: "paid",
        },
      };

      const totalKitchCompletedOrders = await Order.count(query);

      res.json({
        data: {
          total: totalKitchCompletedOrders,
        },
        success: true,
      });
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
      res
        .status(500)
        .json({ message: `Error: ${error.message}`, success: false });
    }
  };

  static getNumberOfAvailableMenuItems = async (
    req: Request,
    res: Response
  ) => {
    const { date: dateParam } = req.params;

    try {
      // Handle date parameters based on the provided value
      const { startDate, endDate } = dateParam
        ? calculateDates(dateParam)
        : { startDate: new Date(), endDate: new Date() };

      const query = {
        where: {
          ...(dateParam && {
            createdAt: {
              [Op.gte]: startDate,
              [Op.lt]: endDate,
            },
          }),
          isAvailable: true,
        },
      };

      const totalAvailableMenuItems = await MenuItem.count(query);

      res.json({
        data: {
          total: totalAvailableMenuItems,
        },
        success: true,
      });
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
      res
        .status(500)
        .json({ message: `Error: ${error.message}`, success: false });
    }
  };

  static getTotalKitchenOrderStats = async (req: Request, res: Response) => {
    const { date: dateParam } = req.params;

    try {
      // Handle date parameters based on the provided value
      const { startDate, endDate } = dateParam
        ? calculateDates(dateParam)
        : { startDate: new Date(), endDate: new Date() };

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

      const allKitchOrders = await Order.findAll(query);

      const total_orders = allKitchOrders.length;
      const prepared_orders = allKitchOrders.filter(
        (order: IOrder) => order.kitchen_status === "ready"
      )?.length;
      const pending_orders = allKitchOrders.filter(
        (order: IOrder) => order.kitchen_status === "pending"
      )?.length;

      res.json({
        data: {
          total: total_orders,
          pending_orders,
          prepared_orders,
        },
        success: true,
      });
    } catch (error: any) {
      console.log(`Error: ${error.message}`);
      res
        .status(500)
        .json({ message: `Error: ${error.message}`, success: false });
    }
  };

  static getRestaurantDateIncome = async (req: Request, res: Response) => {
    try {
      const { date: dateParam } = req.params;

      // Handle date parameters based on the provided value
      const { startDate, endDate } = dateParam
        ? calculateDates(dateParam)
        : { startDate: new Date(), endDate: new Date() };

      // Fetch and group rental orders (filtered by date and finance_status)
      const query = {
        where: {
          ...(dateParam && {
            // Include date filter if dateParam exists
            createdAt: {
              [Op.gte]: startDate,
              [Op.lt]: endDate,
            },
          }),
          finance_status: "paid",
        },
        attributes: [
          [
            Sequelize.fn("DATE_TRUNC", "hour", Sequelize.col("updatedAt")),
            "hour",
          ], // Extract hour from updatedAt
          [Sequelize.fn("SUM", Sequelize.col("totalPrice")), "total_amount"], // Sum totalPrice for each hour
        ],
        group: ["hour"], // Group by hour
        raw: true, // Use raw result objects
      };

      const incomeData = await Order.findAll(query);

      // Prepare and return the response
      const response = {
        data: incomeData, // Response data already formatted as expected
      };

      res.json(response);
    } catch (error: any) {
      console.log(`Error ${error.message}`);
      res
        .status(500)
        .json({ message: `Error ${error.message}`, success: false });
    }
  };
}
