import { createUser, findByEmail } from "./auth.repository.js";
import bcrypt from "bcrypt";

export const register = async (data) => {
  const existingUser = await findByEmail(data.email);

  if (existingUser) {
    throw new Error("User already registerd");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await createUser({
    name: data.name,
    email: data.email,
    password: hashedPassword,
  });

  return user;
};
