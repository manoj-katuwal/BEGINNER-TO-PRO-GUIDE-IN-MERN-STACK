import { logger } from "../utils/logger.js";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  if (!token || token !== "valid-token") {
    logger.warn("Invalid or missing token", {
      event: "authMiddleware",
      tokenPresent: Boolean(token),
      tokenValue: token || null,
    });
    return res.status(401).json({ error: "Unauthorized: invalid or missing token." });
  }

  next();
};
