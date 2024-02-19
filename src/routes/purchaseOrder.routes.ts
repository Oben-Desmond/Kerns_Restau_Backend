import { PurchaseOrderController } from "./../controllers/purchaseOrder";
import express from "express";

const router = express.Router();

//get all purchase orders
router.get("/", PurchaseOrderController.getAllPurchaseOrders);

//get purchase order by id
router.get("/:id", PurchaseOrderController.getPurchaseOrderById);

// get all purchase orders by item id
router.get("/item/:id", PurchaseOrderController.getPurchaseOrderById);

//create purchase order
router.post("/", PurchaseOrderController.createPurchaseOrder);

//update purchase order
router.put("/:id", PurchaseOrderController.updatePurchaseOrder);

//delete purchase order
router.delete("/:id", PurchaseOrderController.deleteOrder);

export default router;
