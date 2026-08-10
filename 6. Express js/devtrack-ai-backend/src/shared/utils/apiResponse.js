export const successResponse = (res, statusCode, message, data) => {
  return res.status(statusCode).json({
    success: true,
    status: statusCode,
    message,
    data,
    requestId: res.locals.requestId,
    timestamp: new Date().toISOString(),
  });
};
