const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let status = err.status || "error";

  res.status(statusCode).json({
    status: status,
    statusCode: statusCode,
    message: err.message,
  });
};

export default errorHandler;
