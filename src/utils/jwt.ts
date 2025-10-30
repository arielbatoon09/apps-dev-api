import jwt from "jsonwebtoken";
import { config } from "@/config";

type JwtPayload = { sub: string; role: string };

export function signAccessToken(userId: string, role: string, ttlSeconds: number) {
  const payload: JwtPayload = { sub: userId, role };
  return jwt.sign(payload, config.jwtSecret, { expiresIn: ttlSeconds });
}

export function verifyAccessToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, config.jwtSecret) as JwtPayload;
  } catch {
    return null;
  }
}


