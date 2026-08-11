import dotenv from "dotenv";
import { encrypt } from "./src/shared/utils/encrypt.js";
import {  decrypt } from "./src/shared/utils/decrypt.js";


dotenv.config();

const originalText = "hello-github-token";

const encryptedText = encrypt(originalText);
const decryptedText = decrypt(encryptedText);

console.log("Original:", originalText);
console.log("Encrypted:", encryptedText);
console.log("Decrypted:", decryptedText);

console.log(
  "Encryption test:",
  originalText === decryptedText ? "PASSED ✅" : "FAILED ❌",
);
