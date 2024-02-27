import { Request, Response } from "express";
import InventoryItem from "../models/InventoryItem.model";
import getDateQueryParam from "../utils/functions/getDateQueryParams";
import { Op } from "sequelize";
import PurchaseOrder from "../models/PurchaseOrder.model";
import * as Sequelize from "sequelize";

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
    try {
      const { date: dateParam } = req.params;
      let query = getDateQueryParam(dateParam);

      query = {
        where: {
          ...query.where,
          quantity: {
            [Op.gt]: 0, // Greater than 0
            [Op.lt]: Sequelize.fn("floor", Sequelize.col("upperBound") / 2), // Less than half of upperBound
          },
        },
      };

      const lowStockItemCount = await InventoryItem.count({});

      res.json({
        data: {
          totalLowStockCount: lowStockItemCount,
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
      let startDate, endDate;

      switch (dateParam) {
        case "last_day":
          startDate = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate() - 1
          );
          endDate = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            new Date().getDate()
          );
          break;
        case "last_month":
          startDate = new Date(
            new Date().getFullYear(),
            new Date().getMonth() - 1,
            1
          );
          endDate = new Date(
            new Date().getFullYear(),
            new Date().getMonth(),
            0
          ); // Last day of previous month
          break;
        case "last_year":
          startDate = new Date(new Date().getFullYear() - 1, 0, 1); // First day of previous year
          endDate = new Date(new Date().getFullYear() - 1, 11, 31); // Last day of previous year
          break;
        case "all_time":
          // No need to set start and end dates
          break;
        default:
          throw new Error(`Invalid dateParam: ${dateParam}`);
      }

      // Build the Sequelize query using aggregate functions and filtering
      const query = {
        where: {
          createdAt: {
            [Op.gte]: startDate,
            [Op.lt]: endDate,
          },
        },
        attributes: [
          [Sequelize.fn("COUNT", Sequelize.col("*")), "total"],
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.where(
                Sequelize.col("quantity"),
                "[Op.gte]",
                Sequelize.col("upperBound")
              )
            ),
            "high_level_stock",
          ],
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.where(
                Sequelize.col("quantity"),
                "[Op.gt]",
                Sequelize.fn("floor", Sequelize.col("upperBound") / 2),
                Sequelize.col("quantity"),
                "[Op.lt]",
                Sequelize.col("upperBound")
              )
            ),
            "level_stock",
          ],
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.where(
                Sequelize.col("quantity"),
                "[Op.gt]",
                0,
                Sequelize.col("quantity"),
                "[Op.lt]",
                Sequelize.fn("floor", Sequelize.col("upperBound") / 2)
              )
            ),
            "low_level_stock",
          ],
          [
            Sequelize.fn(
              "COUNT",
              Sequelize.where(Sequelize.col("quantity"), "[Op.eq]", 0)
            ),
            "out_of_stock",
          ],
        ],
      };

      // Execute the query using Sequelize's findAll method
      const inventoryData = await InventoryItem.findAll(query);

      // Extract and format results
      const response = {
        data: inventoryData[0], // Assuming results are returned in an array
      };

      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error fetching inventory data" });
    }
  };
}
