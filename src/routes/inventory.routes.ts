import { InventoryItemController } from "./../controllers/inventory";
import express from "express";

const router = express.Router();

//get all menu items
router.get("/", InventoryItemController.getInventoryItems);

//get menu item by id
router.get("/:id", InventoryItemController.getInventoryItemById);

//create menu item
router.post("/", InventoryItemController.createInventoryItem);

//update menu item
router.put("/:id", InventoryItemController.updateInventoryItem);

//delete menu item
router.delete("/:id", InventoryItemController.deleteInventoryItem);

export default router;
