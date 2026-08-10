import HTTP_STATUS from "../../constants/httpStatus.js";
import AUTH_MESSAGES from "../../constants/messages.js";
import { successResponse } from "../../shared/utils/apiResponse.js";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import { logAuthEvent } from "../../shared/utils/logAuthEvent.js";
import * as userService from "./user.service.js";

export const getMeController = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  logAuthEvent({
    event: "PROFILE_FETCHED",
    message: "User profile fetched successfully",
    userId,
    requestId: req.requestId,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });

  const user = await userService.getMe(userId);

  successResponse(res, HTTP_STATUS.OK, AUTH_MESSAGES.PROFILE_FETCH, user);
});

export const updateProfileController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const updatedData = req.body;

  const updatedUser = await userService.updateUser(userId, updatedData);

  logAuthEvent({
    event: "PROFILE_UPDATED",
    message: "User profile updated successfully",
    userId,
    requestId: req.requestId,
    ip: req.ip,
    userAgent: req.get("user-agent"),
  });

  successResponse(
    res,
    HTTP_STATUS.OK,
    AUTH_MESSAGES.PROFILE_UPDATE,
    updatedUser,
  );
});
