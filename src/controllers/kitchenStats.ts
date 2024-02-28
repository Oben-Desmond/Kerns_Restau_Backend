import { Request, Response } from "express";
import { Op } from "sequelize";
import calculateDates from "../utils/functions/getDateQueryParams";
import Order from "../models/Order.model";
import { IOrder } from "../types";

export class KitchenStatsController {
  static getKitchenOrders = async (req: Request, res: Response) => {
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

      const totalKitchOrders = await Order.count(query);

      res.json({
        data: {
          total: totalKitchOrders,
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

  static getKitchenCompletedOrders = async (req: Request, res: Response) => {
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
          kitchen_status: "ready",
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

  static getKitchenPendingOrders = async (req: Request, res: Response) => {
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
          kitchen_status: "pending",
        },
      };

      const totalKitchPendingOrders = await Order.count(query);

      res.json({
        data: {
          total: totalKitchPendingOrders,
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
}
