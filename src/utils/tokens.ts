import crypto from "crypto";

export function randomToken(length: number = 32) {
  const bytes = crypto.randomBytes(Math.ceil(length * 0.75));
  return bytes.toString("base64url").slice(0, length);
}


