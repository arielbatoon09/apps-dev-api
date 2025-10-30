import { Request, Response } from "express";
import UserRepository from "@/repositories/UserRepository";
import TokenRepository from "@/repositories/TokenRepository";
import { hashPassword, verifyPassword } from "@/utils/password";
import { signAccessToken } from "@/utils/jwt";
import { config } from "@/config";
import { issueRefreshToken } from "@/services/auth/issue-refresh-token";
import { rotateRefreshToken } from "@/services/auth/rotate-refresh-token";
import { createEmailVerificationToken } from "@/services/auth/create-email-token";
import { verifyEmailToken } from "@/services/auth/verify-email-token";
import { sendMail } from "@/utils/mailer";
import { renderTemplate } from "@/utils/template";

const AuthController = {
  register: async (req: Request, res: Response) => {
    const { email, password, name } = req.body ?? {};
    if (!email || !password) return res.status(400).json({ message: "email and password required" });
    const existing = await UserRepository.findByEmail(email);
    if (existing) return res.status(409).json({ message: "Email already registered" });
    const created = await UserRepository.create({ email, password: hashPassword(password), name: name ?? null });
    const accessToken = signAccessToken(created.id, created.role, config.accessTokenTtlSeconds);
    const refresh = await issueRefreshToken(created.id, config.refreshTokenTtlSeconds);
    res.cookie(config.cookie.name, refresh.token, {
      httpOnly: true,
      secure: config.cookie.secure,
      sameSite: config.cookie.sameSite,
      path: config.cookie.path,
      maxAge: config.refreshTokenTtlSeconds * 1000,
    });
    return res.status(201).json({ accessToken, user: { id: created.id, email: created.email, role: created.role } });
  },
  login: async (req: Request, res: Response) => {
    const { email, password } = req.body ?? {};
    if (!email || !password) return res.status(400).json({ message: "email and password required" });
    const user = await UserRepository.findByEmail(email);
    if (!user || !user.password || !verifyPassword(password, user.password)) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const accessToken = signAccessToken(user.id, user.role, config.accessTokenTtlSeconds);
    const refresh = await issueRefreshToken(user.id, config.refreshTokenTtlSeconds);
    res.cookie(config.cookie.name, refresh.token, {
      httpOnly: true,
      secure: config.cookie.secure,
      sameSite: config.cookie.sameSite,
      path: config.cookie.path,
      maxAge: config.refreshTokenTtlSeconds * 1000,
    });
    return res.status(200).json({ accessToken, user: { id: user.id, email: user.email, role: user.role } });
  },
  refresh: async (req: Request, res: Response) => {
    const cookieToken = (req as any).cookies?.[config.cookie.name];
    if (!cookieToken) return res.status(400).json({ message: "refresh token cookie missing" });
    const rotated = await rotateRefreshToken(cookieToken, config.refreshTokenTtlSeconds);
    if (!rotated) return res.status(401).json({ message: "Invalid refresh token" });
    const userId = (await TokenRepository.findByToken(rotated.token))?.userId ?? null;
    const user = userId ? await UserRepository.findById(userId) : null;
    if (!user) return res.status(401).json({ message: "Invalid refresh token" });
    const accessToken = signAccessToken(user.id, user.role, config.accessTokenTtlSeconds);
    res.cookie(config.cookie.name, rotated.token, {
      httpOnly: true,
      secure: config.cookie.secure,
      sameSite: config.cookie.sameSite,
      path: config.cookie.path,
      maxAge: config.refreshTokenTtlSeconds * 1000,
    });
    return res.status(200).json({ accessToken });
  },
  logout: async (req: Request, res: Response) => {
    const user = (req as any).user as { id: string } | undefined;
    if (!user) return res.status(200).json({ success: true });
    await TokenRepository.revokeAllOfTypeForUser(user.id as string, "REFRESH" as any);
    res.clearCookie(config.cookie.name, {
      httpOnly: true,
      secure: config.cookie.secure,
      sameSite: config.cookie.sameSite,
      path: config.cookie.path,
    } as any);
    return res.status(200).json({ success: true });
  },
  requestEmailVerification: async (req: Request, res: Response) => {
    const user = (req as any).user as { id: string } | undefined;
    if (!user) return res.status(401).json({ message: "Unauthorized" });
    const me = await UserRepository.findById(user.id);
    if (!me || !me.email) return res.status(400).json({ message: "Email not available" });

    const { token, expiresAt } = await createEmailVerificationToken(me.id, config.emailTokenTtlSeconds);
    const url = `${config.frontendUrl.replace(/\/$/, "")}/verify-email?token=${encodeURIComponent(token)}`;
    const html = renderTemplate("email/verify-email.html", {
      name: me.name || "there",
      verifyUrl: url,
      expiresAt: expiresAt.toISOString(),
    });
    await sendMail({ to: me.email, subject: "Verify your email", html, text: `Verify your email: ${url}` });
    return res.status(200).json({ success: true });
  },
  verifyEmail: async (req: Request, res: Response) => {
    const { token } = req.body ?? {};
    if (!token) return res.status(400).json({ message: "token required" });
    const ok = await verifyEmailToken(token);
    if (!ok) return res.status(400).json({ message: "Invalid or expired token" });
    return res.status(200).json({ success: true });
  },
  requestPasswordReset: async (req: Request, res: Response) => {
    return res.status(501).json({ message: "Not implemented" });
  },
  resetPassword: async (req: Request, res: Response) => {
    return res.status(501).json({ message: "Not implemented" });
  },
  oauthStart: async (_req: Request, res: Response) => {
    return res.status(501).json({ message: "Not implemented" });
  },
  oauthCallback: async (req: Request, res: Response) => {
    const passportUser = (req as any).user as { id: string; role: string } | undefined;
    if (!passportUser) return res.status(401).json({ message: "Unauthorized" });
    const accessToken = signAccessToken(passportUser.id, passportUser.role, config.accessTokenTtlSeconds);
    const refresh = await issueRefreshToken(passportUser.id, config.refreshTokenTtlSeconds);
    res.cookie(config.cookie.name, refresh.token, {
      httpOnly: true,
      secure: config.cookie.secure,
      sameSite: config.cookie.sameSite,
      path: config.cookie.path,
      maxAge: config.refreshTokenTtlSeconds * 1000,
    });
    return res.status(200).json({ accessToken });
  },
};

export default AuthController;


