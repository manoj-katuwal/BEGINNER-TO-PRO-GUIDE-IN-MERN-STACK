import jwt from "jsonwebtoken";
import authConfig from "../../config/auth.config.js";

const generateRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
    expiresIn: `${authConfig.refreshTokenExpiresInDays}d`,
  });
};

export default generateRefreshToken;
