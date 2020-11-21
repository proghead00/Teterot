import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getUserDetails } from "../actions/userActions";

const ProfileScreen = ({ location, history }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();

	const userDetails = useSelector((state) => state.userDetails); // get userLogin from the state
	const { loading, error, user } = userDetails; // refrence -> userReducers.js

	const userLogin = useSelector((state) => state.userLogin); // get userLogin from the state
	const { userInfo } = userLogin; // refrence -> userReducers.js

	useEffect(() => {
		// if user is not logged in -> then redirect to /login
		if (!userInfo) {
			history.push("/login");
		} else {
			if (!user.name) {
				dispatch(getUserDetails("profile")); // "profile" gets passed in the {id} at userActions.js
			} else {
				// if user is there
				setName(user.name);
				setEmail(user.email);
			}
		}
	}, [dispatch, history, userInfo, user]);

	const submitHandler = (e) => {
		e.preventDefault(); //since it's a form

		if (password !== confirmPassword) {
			setMessage("Passwords do not match");
		} else {
			//dispatch the updated profile
		}
	};

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{message && <Message variant="danger">{message}</Message>}

				{error && <Message variant="danger">{error}</Message>}
				{loading && <Loader />}

				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="name"
							placeholder="Enter name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="email">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Enter password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="confirmPassword">
						<Form.Label>Confirm password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Confirm password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Button type="submit" variant="primary">
						Update
					</Button>
				</Form>
			</Col>

			<Col md={9}>
				<h2> My orders</h2>
			</Col>
		</Row>
	);
};

export default ProfileScreen;
