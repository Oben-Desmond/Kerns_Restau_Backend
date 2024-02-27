import { Request, Response } from "express";
import InventoryItem from "../models/InventoryItem.model";
import getDateQueryParam from "../utils/functions/getDateQueryParams";
import { Op } from "sequelize";
import PurchaseOrder from "../models/PurchaseOrder.model";
import calculateDates from "../utils/functions/getDateQueryParams";
import { IInventoryItem } from "../types";

export class InventoryStatsController {
  static getTotalInventoryItem = async (req: Request, res: Response) => {
    try {
      /** state management */
      const { date: dateParam } = req.params;

      const query = getDateQueryParam(dateParam);

      const inventoryCount = await InventoryItem.count(query);

      res.status(200).json({
        data: {
          total: inventoryCount,
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

  static getTotalLowStockItem = async (req: Request, res: Response) => {
    const { date: dateParam } = req.params;

    try {
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

      const inventoryData = await InventoryItem.find(query);

      const lowStockItemCount = inventoryData.filter(
        (item: IInventoryItem) =>
          item.quantity > 0 &&
          item.quantity <= Math.floor(item.upper_quantity_bound / 2)
      ).length;

      res.json({
        data: {
          total_low_stock_count: lowStockItemCount,
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

  static getTotalPurchaseOrder = async (req: Request, res: Response) => {
    try {
      /** state management */
      const { date: dateParam } = req.params;

      const query = getDateQueryParam(dateParam);

      const purchaseOrderCount = await PurchaseOrder.count(query);

      res.status(200).json({
        data: {
          total: purchaseOrderCount,
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

  static getInventoryStockLevel = async (req: Request, res: Response) => {
    const { date: dateParam } = req.params;

    try {
      // Handle date parameters based on the provided value
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
      const inventoryData = await InventoryItem.findAll(query);

      // Calculate inventory stock levels (using readability approach)
      const totalStock = inventoryData.length;
      const highLevelStock = inventoryData.filter(
        (item: any) => item.quantity >= item.upperBound
      ).length;

      const levelStock = inventoryData.filter(
        (item: any) =>
          item.quantity > Math.floor(item.upperBound / 2) &&
          item.quantity < item.upperBound
      ).length;

      const lowLevelStock = inventoryData.filter(
        (item: any) =>
          item.quantity > 0 && item.quantity <= Math.floor(item.upperBound / 2)
      ).length;
      const outOfStock = inventoryData.filter(
        (item: any) => item.quantity === 0
      ).length;

      // Prepare and return the response
      const response = {
        data: {
          total: totalStock,
          high_level_stock: highLevelStock,
          level_stock: levelStock,
          low_level_stock: lowLevelStock,
          out_of_stock: outOfStock,
        },
      };

      res.json({ data: response, success: true });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Error fetching inventory data", success: false });
    }
  };
}
