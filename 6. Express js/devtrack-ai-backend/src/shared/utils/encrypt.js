import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

export const ALGORITHM = "aes-256-gcm";

const getEncryptionKey = () => {
  const rawKey =
    process.env.GITHUB_TOKEN_ENCRYPTION_KEY ||
    "0000000000000000000000000000000000000000000000000000000000000000";

  return crypto.createHash("sha256").update(rawKey).digest();
};

export const KEY = getEncryptionKey();

export const encrypt = (text) => {
  const iv = crypto.randomBytes(12);

  const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);

  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);

  const authTag = cipher.getAuthTag();

  return [
    iv.toString("hex"),
    authTag.toString("hex"),
    encrypted.toString("hex"),
  ].join(":");
};
