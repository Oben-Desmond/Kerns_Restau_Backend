import express from "express";
import { restrictToRole } from "../services/authMiddleWare.service";
import { RentalLogsController } from "../controllers/rentalItemLogs";

const router = express.Router();

// Get all rental items logs route
router.get(
  "/",
  restrictToRole(["admin", "rental"]),
  RentalLogsController.getAllItemsLogs
);

// Get all single rental item logs route
router.get(
  "/:id",
  restrictToRole(["admin", "rental"]),
  RentalLogsController.getAllSingleItemLogs
);

export default router;
