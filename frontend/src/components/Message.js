import React from "react";
import { Alert } from "react-bootstrap";

// children -> text that we want inside 👇
const Message = ({ variant, children }) => {
	return <Alert variant={variant}>{children}</Alert>;
};
Message.defaultProps = {
	variant: "info",
};
export default Message;
