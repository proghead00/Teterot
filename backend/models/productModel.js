import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
	{
		name: { type: String, required: true },
		rating: { type: String, required: true }, // individual review rating
		comment: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId, // which admin has created which product
			required: true,
			ref: "User", // referencing a specific model -> Adds a relationship b/w product and the User
		},
		name: {
			type: String,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},

		//brand of the product
		brand: {
			type: String,
			required: true,
		},

		category: {
			type: String,
			required: true,
			default: false,
		},
		description: {
			type: String,
			required: true,
			default: false,
		},

		reviews: [reviewSchema],

		// avg. rating of all the ratings in the reviews
		rating: {
			type: Number,
			required: true,
			default: 0,
		},

		// tracking the no. of reviews
		numReviews: {
			type: Number,
			required: true,
			default: 0,
		},
		price: {
			type: Number,
			required: true,
			default: 0,
		},
		countInStock: {
			type: Number,
			required: true,
			default: 0,
		},
	},
	{
		timestamps: true,
	}
);

const Product = mongoose.model("Product", productSchema); // creating a model from this schema

export default Product;
