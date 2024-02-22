import express from "express";
import { RentalOrdersController } from "../controllers/rentalOrders";
import { restrictToRole } from "../services/authMiddleWare.service";
const router = express.Router();

//get all orders
router.get(
  "/",
  restrictToRole(["admin", "rental", "finance"]),
  RentalOrdersController.getRentalOrders
);

//get order by id
router.get(
  "/:id",
  restrictToRole(["admin", "rental", "finance"]),
  RentalOrdersController.getRentalOrderById
);

//get order by id
router.get(
  "/item/:id",
  restrictToRole(["admin", "rental", "finance"]),
  RentalOrdersController.getRentalOrderByItemId
);

//create order
router.post(
  "/",
  restrictToRole(["admin", "rental", "finance"]),
  RentalOrdersController.createRentalOrder
);

//update order
router.put(
  "/:id",
  restrictToRole(["admin", "rental", "finance"]),
  RentalOrdersController.updateRentalOrder
);

//delete order
router.delete(
  "/:id",
  restrictToRole(["admin", "rental", "finance"]),
  RentalOrdersController.deleteRentalOrder
);

export default router;
