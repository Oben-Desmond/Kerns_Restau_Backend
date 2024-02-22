import express from "express";
import { restrictToRole } from "../services/authMiddleWare.service";
import { InventoryLogsController } from "../controllers/inventoryLogs";

const router = express.Router();

// Get all inventory items logs route
router.get(
  "/",
  restrictToRole(["admin", "inventory"]),
  InventoryLogsController.getAllItemsLogs
);

// Get all single user logs route
router.get(
  "/:id",
  restrictToRole(["admin", "inventory"]),
  InventoryLogsController.getAllSingleItemLogs
);

export default router;
