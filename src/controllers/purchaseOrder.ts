import { Request, Response } from "express";
import PurchaseOrder from "../models/PurchaseOrder.model";

export class PurchaseOrderController {
  /**
   * @private Get all purchase orders
   */
  static getAllPurchaseOrders = async (req: Request, res: Response) => {
    try {
      const purchaseOrder = await PurchaseOrder.findAll();
      res.json({ data: purchaseOrder, success: true });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  };

  /**
   * Get purchase order of an particular Item passing item_id
   */
  static getPurchaseOrderByItemId = async (req: Request, res: Response) => {
    try {
      const purchaseOrder = await PurchaseOrder.findAll({
        item_id: req.params.id,
      });

      if (!purchaseOrder) {
        return res.status(404).json({
          message: "Purchase order not found",
          success: false,
        });
      }

      res.json({
        data: purchaseOrder,
        success: true,
      });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  };

  /**
   * Get Purchase order by id using purchase order id
   * @param req Request object
   * @param res Response object
   * @returns 404 if not found, otherwise return nothing
   */

  static getPurchaseOrderById = async (req: Request, res: Response) => {
    try {
      const purchaseOrder = await PurchaseOrder.findByPk(req.params.id);

      if (!purchaseOrder) {
        return res.status(404).json({
          message: "Purchase order not found",
          success: false,
        });
      }

      res.json({
        data: purchaseOrder,
        success: true,
      });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  };

  /**
   * @private Create a new purchase Order
   */

  static createPurchaseOrder = async (req: Request, res: Response) => {
    try {
      const purchaseOrder = await PurchaseOrder.create(req.body);
      res.send({
        data: purchaseOrder,
        success: true,
      });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send("Server error: " + error.message);
    }
  };

  /**
   *  Function to update Purchase Order using item_id
   * @param req Request object
   * @param res response object
   * @returns 404 if not found, otherwise returns nothing
   */
  static updatePurchaseOrder = async (req: Request, res: Response) => {
    try {
      const purchaseOrder = await PurchaseOrder.findByPk(req.params.id);
      if (!purchaseOrder) {
        return res
          .status(404)
          .json({ message: "Purchase Order not found", success: false });
      }
      await purchaseOrder.update(req.body);
      res.json({ data: purchaseOrder, success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error" + err.message);
    }
  };

  /**
   * Function to delete purchase order
   * @param req Request object
   * @param res Response object
   * @returns 404 if not found, otherwise return nothing
   */
  static deleteOrder = async (req: Request, res: Response) => {
    try {
      const purchaseOrder = await PurchaseOrder.findByPk(req.params.id);
      if (!purchaseOrder) {
        return res.status(404).json({
          message: "Purchase Order not found",
          success: false,
        });
      }
      await purchaseOrder.destroy();
      res.json({ message: "Order removed", success: true });
    } catch (err: any) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  };
}
