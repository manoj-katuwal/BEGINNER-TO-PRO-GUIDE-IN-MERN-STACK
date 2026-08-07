import HTTP_STATUS from "../constants/httpStatus.js";
import AppError from "../shared/utils/AppError.js";

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          "Forbidden",

          HTTP_STATUS.FORBIDDEN,
        ),
      );
    }

    next();
  };
};
