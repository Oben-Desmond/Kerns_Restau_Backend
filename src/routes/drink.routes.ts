import { restrictToRole } from "../services/authMiddleWare.service";
import { DrinkController } from "./../controllers/drinks";
import express from "express";

const router = express.Router();

//get all menu items
router.get(
  "/",
  restrictToRole(["admin", "kitchen"]),
  DrinkController.getDrinks
);

//get menu item by id
router.get(
  "/:id",
  restrictToRole(["admin", "kitchen"]),
  DrinkController.getDrinkById
);

//create menu item
router.post(
  "/",
  restrictToRole(["admin", "kitchen"]),
  DrinkController.createDrink
);

//update menu item
router.put(
  "/:id",
  restrictToRole(["admin", "kitchen"]),
  DrinkController.updateDrink
);

//delete menu item
router.delete(
  "/:id",
  restrictToRole(["admin", "kitchen"]),
  DrinkController.deleteDrink
);

export default router;
