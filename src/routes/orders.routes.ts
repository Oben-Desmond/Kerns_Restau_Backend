import express from 'express';
import { OrdersController } from '../controllers/orders';

const router = express.Router();

//get all orders
router.get('/', OrdersController.getOrders);

//get order by id
router.get('/:id', OrdersController.getOrderById);

//create order
router.post('/', OrdersController.createOrder);

//update order
router.put('/:id', OrdersController.updateOrder);

//delete order
router.delete('/:id', OrdersController.deleteOrder);

export default router;