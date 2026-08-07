import bcrypt from "bcrypt";
import * as authRepository from "./auth.repository.js";
// import AppError from "../../utils/AppError.js";
import AppError from "../../shared/utils/AppError.js";
import { generateToken } from "../../shared/utils/generateToken.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import generateRefreshToken from "../../shared/utils/generateRefreshToken.js";
import RefreshToken from "../refreshToken/refreshToken.model.js";
import { createRefreshToken } from "../refreshToken/refreshToken.repository.js";

// import { use } from "react";

export const register = async (userData) => {
  const { name, email, password, role } = userData;

  const existingUser = await authRepository.findByEmail(email);

  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await authRepository.createUser({
    name,
    email,
    password: hashedPassword,
    role: "user",
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const loginUser = async (credientials) => {
  const { email, password } = credientials;

  const user = await authRepository.findByEmail(email);

  if (!user) {
    throw new AppError("Invalid email or password", 400);
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw new AppError("Invalid email or password", 400);
  }

  const token = generateToken(user);
  const refreshToken = generateRefreshToken({
    userId: user.id,
  });

  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  await createRefreshToken({
    userId: user.id,

    token: hashedRefreshToken,

    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });

  return {
    token,
    refreshToken,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
};
