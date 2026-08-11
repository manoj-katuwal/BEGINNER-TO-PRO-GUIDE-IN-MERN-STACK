import asyncHandler from "../../shared/utils/asyncHandler.js";
import * as userSettingsService from "./userSettings.service.js";
import { successResponse } from "../../shared/utils/apiResponse.js";
import HTTP_STATUS from "../../constants/httpStatus.js";
import AUTH_MESSAGES, {
  USER_SETTINGS_MESSAGES,
} from "../../constants/messages.js";

export const getUserSettingsController = asyncHandler(async (req, res) => {
  const userId = req.user.id;

  const settings = await userSettingsService.getUserSettings(userId);

  successResponse(
    res,
    HTTP_STATUS.OK,
    USER_SETTINGS_MESSAGES.SETTINGS_FETCH_SUCCESS,
    settings,
  );
});

export const updateUserSettingsController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const data = req.body;

  const settings = await userSettingsService.updateUserSettings(userId, data);

  successResponse(
    res,
    HTTP_STATUS.OK,
    USER_SETTINGS_MESSAGES.SETTINGS_UPDATE_SUCCESS,
    settings,
  );
});
