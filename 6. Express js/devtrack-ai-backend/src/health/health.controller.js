//  import AppError from "../utils/AppError.js";

import HTTP_STATUS from "../constants/httpStatus.js";

// FOR TESTING PURPOSES ONLY AFTER MAKING ERROR HANDLER MIDDLEWARE, YOU CAN USE THIS FUNCTION TO TEST THE ERROR HANDLER MIDDLEWARE
// export const getHealth = (req, res, next) => {
//   return next(new AppError("Health service is temporarily unavailable", 503));
// };

export const healthCheck = (req, res) => {
  res.status(HTTP_STATUS.OK).json({
    success: true,
    message: "Server is running",
    data: {
      status: "UP",
      environment: process.env.NODE_ENV || "development",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
    },
  });
};
