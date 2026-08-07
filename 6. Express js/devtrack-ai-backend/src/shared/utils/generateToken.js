import jwt from "jsonwebtoken";

export const generateToken = (user) => jwt.sign(
  {
    userId: user.id,
    email: user.email,
  },
  process.env.JWT_SECRET,
  {
    expiresIn: process.env.JWT_EXPIRES_IN || "1h",
  },
);
