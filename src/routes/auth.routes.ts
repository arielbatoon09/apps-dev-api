import { Router } from "express";
import AuthController from "@/controllers/AuthController";
import passport from "passport";

const router = Router();

// Local auth
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/refresh", AuthController.refresh);
router.post("/logout", AuthController.logout);

// Email verification
router.post("/email/request", AuthController.requestEmailVerification);
router.post("/email/verify", AuthController.verifyEmail);

// Password reset
router.post("/password/request", AuthController.requestPasswordReset);
router.post("/password/reset", AuthController.resetPassword);

// OAuth via Passport -> then issue JWT/refresh
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/auth/failed" }),
  AuthController.oauthCallback
);
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"], session: false })
);
router.get(
  "/github/callback",
  passport.authenticate("github", { session: false, failureRedirect: "/auth/failed" }),
  AuthController.oauthCallback
);

export default router;