import { DrinkController } from "./../controllers/drinks";
import express from "express";

const router = express.Router();

//get all menu items
router.get("/", DrinkController.getDrinks);

//get menu item by id
router.get("/:id", DrinkController.getDrinkById);

//create menu item
router.post("/", DrinkController.createDrink);

//update menu item
router.put("/:id", DrinkController.updateDrink);

//delete menu item
router.delete("/:id", DrinkController.deleteDrink);

export default router;
