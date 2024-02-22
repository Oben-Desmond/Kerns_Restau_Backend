import { restrictToRole } from "../services/authMiddleWare.service";
import { PurchaseOrderController } from "./../controllers/purchaseOrder";
import express from "express";

const router = express.Router();

//get all purchase orders
router.get(
  "/",
  restrictToRole(["admin", "inventory"]),
  PurchaseOrderController.getAllPurchaseOrders
);

//get purchase order by id
router.get(
  "/:id",
  restrictToRole(["admin", "inventory"]),
  PurchaseOrderController.getPurchaseOrderById
);

// get all purchase orders by item id
router.get(
  "/item/:id",
  restrictToRole(["admin", "inventory"]),
  PurchaseOrderController.getPurchaseOrderById
);

//create purchase order
router.post(
  "/",
  restrictToRole(["admin", "inventory"]),
  PurchaseOrderController.createPurchaseOrder
);

//update purchase order
router.put(
  "/:id",
  restrictToRole(["admin", "inventory"]),
  PurchaseOrderController.updatePurchaseOrder
);

//delete purchase order
router.delete(
  "/:id",
  restrictToRole(["admin", "inventory"]),
  PurchaseOrderController.deleteOrder
);

export default router;
