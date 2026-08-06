import asyncHandler from "../../shared/utils/asyncHandler.js";
import * as authService from "./auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;

  const user = await authService.register(req.body);

  res.status(201).json({
    success: true,
    message: "User registerd successfully",
    data: user,
  });
});
