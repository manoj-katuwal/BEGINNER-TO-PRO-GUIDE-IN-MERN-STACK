import bcrypt from "bcrypt";
import * as authRepository from "./auth.repository.js";
// import AppError from "../../utils/AppError.js";
import AppError from "../../shared/utils/AppError.js";

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
