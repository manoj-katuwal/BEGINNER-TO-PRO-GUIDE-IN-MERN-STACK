import crypto from "crypto";

export const generateOAuthState = () => {
  return crypto.randomBytes(16).toString("hex");
};
