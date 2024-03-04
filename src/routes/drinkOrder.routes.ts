import express from "express";
import { restrictToRole } from "../services/authMiddleWare.service";
import { DrinkOrdersController } from "../controllers/drinkOrder";

const router = express.Router();

//get all orders
router.get(
  "/",
  restrictToRole(["admin", "waiter", "kitchen", "finance"]),
  DrinkOrdersController.getDrinkOrders
);

//get order by id
router.get(
  "/:id",
  restrictToRole(["admin", "waiter", "kitchen", "finance"]),
  DrinkOrdersController.getDrinkOrderById
);

//create order
router.post(
  "/",
  restrictToRole(["admin", "waiter", "kitchen", "finance"]),
  DrinkOrdersController.createDrinkOrder
);

//update order
router.put(
  "/:id",
  restrictToRole(["admin", "waiter", "kitchen", "finance"]),
  DrinkOrdersController.updateDrinkOrder
);

//delete order
router.delete(
  "/:id",
  restrictToRole(["admin", "waiter", "kitchen", "finance"]),
  DrinkOrdersController.deleteDrinkOrder
);

export default router;
