import passport from "passport";
import { setupGoogleStrategy } from "@/strategies/google";
import { setupGithubStrategy } from "@/strategies/github";

export function initializePassport() {
  setupGoogleStrategy(passport);
  setupGithubStrategy(passport);

  passport.serializeUser((user: any, done) => {
    done(null, { id: user.id, role: user.role });
  });
  passport.deserializeUser((obj: any, done) => {
    done(null, obj);
  });
}

export default initializePassport;


