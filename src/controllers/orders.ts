import { Request, Response } from "express";
import Order from "../models/Order.model";


//orders controller
export class OrdersController {

    //get all orders
    static getOrders = async (req: Request, res: Response) => {
        try {
            const orders = await Order.findAll();
            res.json(orders);
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
                return res.status(404).json({ msg: 'Order not found' });
            }
            res.json(order);
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }

    //create order
    static createOrder = async (req: Request, res: Response) => {
        try {
            const order = await Order.create(req.body);
            res.json(order);
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
                return res.status(404).json({ msg: 'Order not found' });
            }
            await order.update(req.body);
            res.json(order);
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
                return res.status(404).json({ msg: 'Order not found' });
            }
            await order.destroy();
            res.json({ msg: 'Order removed' });
        } catch (err: any) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
}