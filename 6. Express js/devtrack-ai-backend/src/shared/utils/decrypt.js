import crypto from "crypto";
import { ALGORITHM, KEY } from "./encrypt.js";

export const decrypt = (encryptedText) => {
  const [ivHex, authTagHex, encryptedHex] = encryptedText.split(":");

  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");

  const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);

  decipher.setAuthTag(authTag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final(),
  ]);

  return decrypted.toString("utf8");
};
