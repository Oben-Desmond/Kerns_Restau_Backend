import { Request, Response } from "express";
import MenuItem from "../models/MenuItem.model";


export class MenuItemController {

    //get all menuItems
    static getMenuItems = async (req: Request, res: Response) => {
        try {
            const menuItems = await MenuItem.findAll();
            res.json({ data: menuItems, success: true });
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

    //get menuItem by id
    static getMenuItemById = async (req: Request, res: Response) => {
        try {
            const menuItem = await MenuItem.findByPk(req.params.id);
            if (!menuItem) {
                return res.status(404).json({ message: 'MenuItem not found', success: false });
            }
            res.json({ data: menuItem, success: true });
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

    //create menuItem
    static createMenuItem = async (req: Request, res: Response) => {
        try {
            const menuItem = await MenuItem.create(req.body);
            res.json({ data: menuItem, success: false });
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

    //update menuItem
    static updateMenuItem = async (req: Request, res: Response) => {
        try {
            const menuItem = await MenuItem.findByPk(req.params.id);
            if (!menuItem) {
                return res.status(404).json({ message: 'MenuItem not found', success: false });
            }
            await menuItem.update(req.body);
            res.json(menuItem);
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

    //delete menuItem
    static deleteMenuItem = async (req: Request, res: Response) => {
        try {
            const menuItem = await MenuItem.findByPk(req.params.id);
            if (!menuItem) {
                return res.status(404).json({ message: 'MenuItem not found', success: false });
            }
            await menuItem.destroy();
            res.json({ message: 'MenuItem removed', success: true });
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
}

