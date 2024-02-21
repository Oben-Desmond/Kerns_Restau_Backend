import express from "express";
import { RentalItemController } from "../controllers/rentalItem";

const router = express.Router();

//get all Rental items
router.get("/", RentalItemController.getRentalItems);

//get Rental item by id
router.get("/:id", RentalItemController.getRentalItemById);

//create Rental item
router.post("/", RentalItemController.createRentalItem);

//update Rental item
router.put("/:id", RentalItemController.updateRentalItem);

//delete Rental item
router.delete("/:id", RentalItemController.deleteRentalItem);

export default router;
