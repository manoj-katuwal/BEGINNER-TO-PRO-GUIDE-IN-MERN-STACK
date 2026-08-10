import HTTP_STATUS from "../../constants/httpStatus.js";
import AUTH_MESSAGES from "../../constants/messages.js";
import AppError from "../../shared/utils/AppError.js";
import { logAuthEvent } from "../../shared/utils/logAuthEvent.js";
import * as userRepository from "./user.repository.js";

export const getMe = async (userId) => {
  const user = await userRepository.findById(userId);

  if (!user) {
    logAuthEvent({
      level: "warn",
      event: "PROFILE_FETCH_FAILED",
      message: "Profile fetch attempted for missing user",
      userId,
    });

    throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  return user;
};

export const updateUser = async (userId, updates) => {
  const user = await userRepository.updateById(userId, updates);

  if (!user) {
    logAuthEvent({
      level: "warn",
      event: "PROFILE_UPDATE_FAILED",
      message: "Profile update attempted for missing user",
      userId,
    });

    throw new AppError(AUTH_MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
  }

  return user;
};
