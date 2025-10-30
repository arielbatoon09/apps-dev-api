import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@/utils/jwt";
import { Role } from "@prisma/client";

export function authenticateJwt(req: Request, res: Response, next: NextFunction) {
  const auth = req.header("authorization") || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : "";
  if (!token) return res.status(401).json({ message: "Unauthorized" });
  const payload = verifyAccessToken(token);
  if (!payload) return res.status(401).json({ message: "Unauthorized" });
  (req as any).user = { id: payload.sub, role: payload.role };
  next();
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if ((req as any).user) return next();
  return res.status(401).json({ message: "Unauthorized" });
}

export function requireRole(roles: Role[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as { id: string; role: Role } | undefined;
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    if (!roles.includes(user.role)) return res.status(403).json({ message: "Forbidden" });
    next();
  };
}