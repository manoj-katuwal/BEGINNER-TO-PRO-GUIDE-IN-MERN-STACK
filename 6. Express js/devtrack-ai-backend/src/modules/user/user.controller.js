import HTTP_STATUS from "../../constants/httpStatus.js";
import AUTH_MESSAGES from "../../constants/messages.js";
import { successResponse } from "../../shared/utils/apiResponse.js";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import * as userService from "./user.service.js";

export const getMeController = asyncHandler(async (req, res) => {
  const user = await userService.getMe(req.user.id);

  successResponse(res, HTTP_STATUS.OK, AUTH_MESSAGES.PROFILE_FETCH, user);
});
