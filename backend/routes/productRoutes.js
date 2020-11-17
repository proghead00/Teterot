import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

const router = express.Router();

// @description     Fetch all products
// @route           GET /api/products
// @access          Public
router.get(
	"/",
	asyncHandler(async (req, res) => {
		const products = await Product.find({}); // empty object gives everything

		res.json(products);
	})
);

// @description     Fetch single product
// @route           GET /api/product/:id
// @access          Public
router.get(
	"/:id",
	asyncHandler(async (req, res) => {
		const product = await Product.findById(req.params.id); // gives the id in url

		// checking if there's a product
		if (product) {
			res.json(product);
		} else {
			// to get the error -> has to be in FORMATTED ID but ain't in the DB
			res.status(404);
			throw new Error("Product not found");
		}
	})
);

export default router;
