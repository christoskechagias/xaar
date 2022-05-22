import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Order from '../model/orderModel.js';
import { isAdmin, isAuth } from '../utils.js';

const orderRouter = express.Router();

orderRouter.post(
	'/create',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		if (req.body.orderItems.length === 0) {
			res.status(400).send({ message: 'Cart is empty' });
		} else {
			const order = new Order({
				orderItems: req.body.orderItems,
				shippingAddress: req.body.shippingAddress,
				itemsPrice: req.body.itemsPrice,
				shippingPrice: req.body.shippingPrice,
				taxPrice: req.body.taxPrice,
				totalPrice: req.body.totalPrice,
				userId: req.user._id,
				isPaid: true,
				paidAt: Date.now(),
			});
			const createdOrder = await order.save();
			res
				.status(201)
				.send({ message: 'New Order Created', order: createdOrder });
		}
	})
);

orderRouter.get(
	'/my/get/all',
	isAuth,
	expressAsyncHandler(async (req, res) => {
		const orders = await Order.find({ userId: req.user._id });
		if (orders) {
			res.status(202).send(orders);
		} else {
			res.status(404).send({ message: 'Order Not Found' });
		}
	})
);

//Admin (getOrders,updateOrder)
orderRouter.get(
	'/get/all/admin',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const orders = await Order.find();
		if (orders) {
			res.status(202).send(orders);
		} else {
			res.status(404).send({ message: 'Orders Not Found' });
		}
	})
);
orderRouter.put(
	'/update',
	isAuth,
	isAdmin,
	expressAsyncHandler(async (req, res) => {
		const order = await Order.findById(req.body.orderId);
		if (order) {
			order.deliveryStatus = req.body.deliveryStatus;
			console.log(req.body);
			const updatedOrder = await order.save();
			if (updatedOrder) {
				res.status(202).send({
					message: 'Order Delivery Status Updated',
					order: updatedOrder,
				});
			} else {
				res.status(404).send({
					message: 'Order delivery status not updated',
				});
			}
		} else {
			res.status(404).send({ message: 'Order Not Found' });
		}
	})
);
export default orderRouter;
