import { successResponse } from "../../shared/utils/apiResponse.js";
import asyncHandler from "../../shared/utils/asyncHandler.js";
import * as authService from "./auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);

  successResponse(res, 201, "User registered successfully", user);
});

export const login = asyncHandler(async (req, res) => {
  const result = await authService.loginUser(req.body);

  successResponse(res, 200, "User Login successfully", result);
});
