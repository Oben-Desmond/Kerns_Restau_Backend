import { Request, Response } from "express";
import Order from "../models/Order.model";
import { OrderService } from "../services/orders.service";


//orders controller
export class OrdersController {

    //get all orders
    static getOrders = async (req: Request, res: Response) => {
        try {
            const orders = await Order.findAll();
            const menuItems = await OrderService.getMenuItems(orders)
            console.warn(menuItems)
            const orderJson = [

                ...menuItems
            ]
            res.json({ data: orderJson, success: true });
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

    //get order by id
    static getOrderById = async (req: Request, res: Response) => {
        try {
            const order = await Order.findByPk(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found', success: false });
            }
            res.json({ data: order, success: true });
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

    //create order
    static createOrder = async (req: Request, res: Response) => {
        try {
            const order = await Order.create(req.body);
            res.send({ data: order, success: true });
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

    //update order
    static updateOrder = async (req: Request, res: Response) => {
        try {
            const order = await Order.findByPk(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found', success: false });
            }
            await order.update(req.body);
            res.json({ data: order, success: true });
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

    //delete order
    static deleteOrder = async (req: Request, res: Response) => {
        try {
            const order = await Order.findByPk(req.params.id);
            if (!order) {
                return res.status(404).json({ message: 'Order not found', success: false });
            }
            await order.destroy();
            res.json({ message: 'Order removed', success: true });
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
}