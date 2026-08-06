//  import AppError from "../utils/AppError.js";

// FOR TESTING PURPOSES ONLY AFTER MAKING ERROR HANDLER MIDDLEWARE, YOU CAN USE THIS FUNCTION TO TEST THE ERROR HANDLER MIDDLEWARE
// export const getHealth = (req, res, next) => {
//   return next(new AppError("Health service is temporarily unavailable", 503));
// };

export const healthCheck = (req, res) => {
  res.status(200).json({
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
