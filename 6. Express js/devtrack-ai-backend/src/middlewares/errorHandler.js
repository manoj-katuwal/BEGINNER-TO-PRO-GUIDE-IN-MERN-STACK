import logger from "../config/logger.js";

const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let status = err.status || "error";

  logger.error("Request failed", {
    requestId: req.requestId,
    method: req.method,
    path: req.originalUrl,
    statusCode,
    error: err.message,
    stack: err.stack,
  });

  res.status(statusCode).json({
    status: status,
    statusCode: statusCode,
    message: err.message,
    requestId: req.requestId,
  });
};

export default errorHandler;
