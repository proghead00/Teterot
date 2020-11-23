import {
	ORDER_CREATE_REQUEST,
	ORDER_CREATE_SUCCESS,
	ORDER_CREATE_FAIL,
	ORDER_DETAILS_REQUEST,
	ORDER_DETAILS_SUCCESS,
	ORDER_DETAILS_FAIL,
} from "../constants/orderConstants";
import axios from "axios";

export const createOrder = (order) => async (dispatch, getState) => {
	// getState is required because token is needed to be sent
	try {
		dispatch({
			type: ORDER_CREATE_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState(); // userInfo is in userLogin

		const config = {
			headers: {
				"Content-Type": "application/json",

				//pass token
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.post(`/api/orders`, order, config);

		dispatch({
			type: ORDER_CREATE_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
	// getState is required because token is needed to be sent
	try {
		dispatch({
			type: ORDER_DETAILS_REQUEST,
		});

		const {
			userLogin: { userInfo },
		} = getState(); // userInfo is in userLogin

		const config = {
			headers: {
				//pass token
				Authorization: `Bearer ${userInfo.token}`,
			},
		};

		const { data } = await axios.get(`/api/orders/${id}`, config);

		dispatch({
			type: ORDER_DETAILS_SUCCESS,
			payload: data,
		});
	} catch (error) {
		dispatch({
			type: ORDER_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		});
	}
};
