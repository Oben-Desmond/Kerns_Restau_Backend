import express from "express";
import { RentalItemController } from "../controllers/rentalItem";
import { restrictToRole } from "../services/authMiddleWare.service";

const router = express.Router();

//get all Rental items
router.get(
  "/",
  restrictToRole(["admin", "rental"]),
  RentalItemController.getRentalItems
);

//get Rental item by id
router.get(
  "/:id",
  restrictToRole(["admin", "rental"]),
  RentalItemController.getRentalItemById
);

//create Rental item
router.post(
  "/",
  restrictToRole(["admin", "rental"]),
  RentalItemController.createRentalItem
);

//update Rental item
router.put(
  "/:id",
  restrictToRole(["admin", "rental"]),
  RentalItemController.updateRentalItem
);

//delete Rental item
router.delete(
  "/:id",
  restrictToRole(["admin", "rental"]),
  RentalItemController.deleteRentalItem
);

export default router;
