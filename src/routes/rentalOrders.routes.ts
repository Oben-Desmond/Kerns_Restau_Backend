import express from "express";
import { RentalOrdersController } from "../controllers/rentalOrders";
const router = express.Router();

//get all orders
router.get("/", RentalOrdersController.getRentalOrders);

//get order by id
router.get("/:id", RentalOrdersController.getRentalOrderById);

//create order
router.post("/", RentalOrdersController.createRentalOrder);

//update order
router.put("/:id", RentalOrdersController.updateRentalOrder);

//delete order
router.delete("/:id", RentalOrdersController.deleteRentalOrder);

export default router;
