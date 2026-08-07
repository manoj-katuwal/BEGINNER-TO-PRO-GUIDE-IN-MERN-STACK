import HTTP_STATUS from "../../constants/httpStatus.js";
import AUTH_MESSAGES from "../../constants/messages.js";
import { successResponse } from "../../shared/utils/apiResponse.js";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import * as authService from "./auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  successResponse(res, HTTP_STATUS.CREATED, AUTH_MESSAGES.REGISTER_SUCCESS, user);
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);

  successResponse(res, HTTP_STATUS.OK, AUTH_MESSAGES.LOGIN_SUCCESS, result);
});


export const refreshController = asyncHandler(async(req, res )=> {
  const {refreshToken} = req.body;
  const result = await authService.refreshToken(refreshToken);

  successResponse(res, HTTP_STATUS.OK , AUTH_MESSAGES.TOKEN_REFRESED, result);
})
