import asyncHandler from "express-async-handler";
import Order from "../models/orderModel.js";

// @description     Create new order
// @route           POST /api/orders
// @access          Pvt
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body; // coming from the body

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error("No order items");
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();

		res.status(201).json(createdOrder);
	}
});

// @description     Get order by ID
// @route           GET /api/orders/:id
// @access          Pvt
const getOrderById = asyncHandler(async (req, res) => {
	// fetch the ordrr
	const order = await (await Order.findById(req.params.id)).populate(
		"user",
		"name email"
	);

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});
export { addOrderItems, getOrderById };
