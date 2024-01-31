import { MenuItemController } from "../controllers/menuItem";
import MenuItem from "../models/MenuItem.model";
import { IOrderRequest, IMenuItem, IOrder } from "../types";



export class OrderService {

    static async getMenuItems(orders: { dataValues: IOrderRequest }[]) {


        let newOrders: IOrder[] = []

        for (let i = 0; i < orders.length; i++) {
            const order = orders[i].dataValues;

            let menus: IMenuItem[] = [];

            for (let j = 0; j < order.menu_items.length; j++) {
                const menuItem = order.menu_items[j];
                const item = await MenuItem.findByPk(menuItem)
                if (item) {
                    menus = [...menus, item.dataValues]
                }

            }

            newOrders = [...newOrders, { ...order, menu_items: menus } as any]

        }

        return newOrders;

    }


}