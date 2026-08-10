import HTTP_STATUS from "../../constants/httpStatus.js";
import AUTH_MESSAGES from "../../constants/messages.js";
import AppError from "../../shared/utils/AppError.js";
import User from "../auth/auth.model.js";
import * as userRepository from "./user.repository.js";

export const getMe = async (userId) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }
  return user;
};

export const updateUser = async (userId, updates) => {
  const user = await userRepository.updateById(userId, updates);

  if (!user) {
    throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  return user;
};
