import express from 'express';
import { MenuItemController } from '../controllers/menuItem';

const router = express.Router();

//get all menu items
router.get('/', MenuItemController.getMenuItems);

//get menu item by id
router.get('/:id', MenuItemController.getMenuItemById);

//create menu item
router.post('/', MenuItemController.createMenuItem);

//update menu item
router.put('/:id', MenuItemController.updateMenuItem);

//delete menu item
router.delete('/:id', MenuItemController.deleteMenuItem);


export default router;