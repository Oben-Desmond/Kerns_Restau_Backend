import express from "express";
import { MenuItemController } from "../controllers/menuItem";
import { restrictToRole } from "../services/authMiddleWare.service";

const router = express.Router();

//get all menu items
router.get(
  "/",
  restrictToRole(["admin", "kitchen"]),
  MenuItemController.getMenuItems
);

//get menu item by id
router.get(
  "/:id",
  restrictToRole(["admin", "kitchen"]),
  MenuItemController.getMenuItemById
);

//create menu item
router.post(
  "/",
  restrictToRole(["admin", "kitchen"]),
  MenuItemController.createMenuItem
);

//update menu item
router.put(
  "/:id",
  restrictToRole(["admin", "kitchen"]),
  MenuItemController.updateMenuItem
);

//delete menu item
router.delete(
  "/:id",
  restrictToRole(["admin", "kitchen"]),
  MenuItemController.deleteMenuItem
);

export default router;
