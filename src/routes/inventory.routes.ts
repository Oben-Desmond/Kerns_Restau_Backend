import { restrictToRole } from "../services/authMiddleWare.service";
import { InventoryItemController } from "./../controllers/inventory";
import express from "express";

const router = express.Router();

//get all menu items
router.get(
  "/",
  restrictToRole(["inventory", "admin"]),
  InventoryItemController.getInventoryItems
);

//get menu item by id
router.get(
  "/:id",
  restrictToRole(["inventory", "admin"]),
  InventoryItemController.getInventoryItemById
);

//create menu item
router.post(
  "/",
  restrictToRole(["inventory", "admin"]),
  InventoryItemController.createInventoryItem
);

//update menu item
router.put(
  "/:id",
  restrictToRole(["inventory", "admin"]),
  InventoryItemController.updateInventoryItem
);

//delete menu item
router.delete(
  "/:id",
  restrictToRole(["inventory", "admin"]),
  InventoryItemController.deleteInventoryItem
);

export default router;
