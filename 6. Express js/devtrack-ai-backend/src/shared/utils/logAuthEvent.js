import logger from "../../config/logger.js";

export const logAuthEvent = ({
  level = "info",
  event,
  message,
  userId = null,
  familyId = null,
  requestId = null,
  ip = null,
  userAgent = null,
}) => {
  logger.log({
    level,
    message,
    event,
    userId,
    familyId,
    requestId,
    ip,
    userAgent,
  });
};
