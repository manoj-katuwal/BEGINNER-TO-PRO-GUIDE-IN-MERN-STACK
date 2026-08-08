import jwt from "jsonwebtoken";
import crypto from "crypto";
import authConfig from "../../config/auth.config.js";

const generateRefreshToken = (payload) => {
  return jwt.sign({ ...payload, jti: crypto.randomUUID() }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: `${authConfig.refreshTokenExpiresInDays}d`,
  });
};

export default generateRefreshToken;
