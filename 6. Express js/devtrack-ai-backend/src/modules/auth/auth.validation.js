import AppError from "../../shared/utils/AppError.js";

export const validateRegister = async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return new AppError("Name , Email & Password field is required", 400);
  }

  if (password.length < 8) {
    return new AppError("Password must be at least 8 characters", 400);
  }

  next();
};
