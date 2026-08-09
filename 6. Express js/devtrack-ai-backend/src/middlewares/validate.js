import AppError from "../shared/utils/AppError.js";
import HTTP_STATUS from "../constants/httpStatus.js";

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);

    if (error) {
      return next(
        new AppError(error.details[0].message, HTTP_STATUS.BAD_REQUEST),
      );
    }

    next();
  };
};
