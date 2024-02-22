import express from "express";
import { OrdersController } from "../controllers/orders";
import { restrictToRole } from "../services/authMiddleWare.service";

const router = express.Router();

//get all orders
router.get(
  "/",
  restrictToRole(["admin", "waiter", "kitchen", "finance"]),
  OrdersController.getOrders
);

//get order by id
router.get(
  "/:id",
  restrictToRole(["admin", "waiter", "kitchen", "finance"]),
  OrdersController.getOrderById
);

//create order
router.post(
  "/",
  restrictToRole(["admin", "waiter", "kitchen", "finance"]),
  OrdersController.createOrder
);

//update order
router.put(
  "/:id",
  restrictToRole(["admin", "waiter", "kitchen", "finance"]),
  OrdersController.updateOrder
);

//delete order
router.delete(
  "/:id",
  restrictToRole(["admin", "waiter", "kitchen", "finance"]),
  OrdersController.deleteOrder
);

export default router;
