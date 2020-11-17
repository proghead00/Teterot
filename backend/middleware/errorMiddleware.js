const notFound = (req, res, next) => {
	const error = new Error(`Not found -> ${req.originalUrl}`);
	res.status(404);
	next(error);
};

// error middleware -> override the default error handler
const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // 500 -> server error
	res.status(statusCode);
	res.json({
		message: err.message,

		// stack trace
		stack: process.env.NODE_ENV === "production" ? null : err.stack,
	});
};

export { notFound, errorHandler };
