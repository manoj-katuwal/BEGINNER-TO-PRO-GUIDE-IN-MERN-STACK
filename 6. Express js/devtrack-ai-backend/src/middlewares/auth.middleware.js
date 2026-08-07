import AppError from "../shared/utils/AppError.js";
import jwt from "jsonwebtoken";
import * as authRepository from "../modules/auth/auth.repository.js";
import HTTP_STATUS from "../constants/httpStatus.js";
import AUTH_MESSAGES from "../constants/messages.js";

export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return next(new AppError(AUTH_MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED));
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return next(new AppError(AUTH_MESSAGES.UNAUTHORIZED, HTTP_STATUS.UNAUTHORIZED));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded JWT:", decoded);

    const user = await authRepository.findById(decoded.userId);

    if (!user) {
      return next(new AppError(AUTH_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.UNAUTHORIZED));
    }

    req.user = user;
    next();
  } catch (error) {
    next(new AppError(AUTH_MESSAGES.INVALID_TOKEN, HTTP_STATUS.UNAUTHORIZED));
  }
};
