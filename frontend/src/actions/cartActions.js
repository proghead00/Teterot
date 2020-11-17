import axios from "axios"; // when we add an item to the cart, we need to make request to api/products/:id to get the data for the particular product to add to the cart
import { CART_ADD_ITEM } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
	// used thunk -> hence async(dispatch)
	const { data } = await axios.get(`/api/products/${id}`);

	dispatch({
		type: CART_ADD_ITEM,
		payload: {
			product: data._id,
			name: data.name,
			image: data.image,
			price: data.price,
			countInStock: data.countInStock,
			qty,
		},
	});

	localStorage.setItem("cartItems", JSON.stringify(getState.cartItems));
};
