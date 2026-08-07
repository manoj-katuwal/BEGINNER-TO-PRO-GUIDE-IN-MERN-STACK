import bcrypt from "bcrypt";
import * as authRepository from "./auth.repository.js";
// import AppError from "../../utils/AppError.js";
import AppError from "../../shared/utils/AppError.js";
import {generateToken } from "../../shared/utils/generateToken.js";
import jwt from "jsonwebtoken";
// import { use } from "react";

export const register = async (userData) => {
  const { name, email, password } = userData;

  const existingUser = await authRepository.findByEmail(email);

  if (existingUser) {
    throw new AppError("Email already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await authRepository.createUser({
    name,
    email,
    password: hashedPassword,
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

  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
    },
  };
};
