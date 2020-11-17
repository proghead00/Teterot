import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";

const HomeScreen = () => {
	const dispatch = useDispatch();

	const productList = useSelector((state) => state.productList);
	//destructuring to get what we want from product list
	//coming from productReducers.js 👇
	const { loading, error, products } = productList;

	// firing off the action
	useEffect(() => {
		dispatch(listProducts());
	}, [dispatch]);

	return (
		<div>
			<h1> Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant="danger"> {error}</Message>
			) : (
				<Row>
					{products.map((product) => (
						<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
							<Product product={product} />
						</Col>
					))}
				</Row>
			)}
		</div>
	);
};

export default HomeScreen;
