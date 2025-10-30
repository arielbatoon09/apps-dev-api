import { Strategy as GoogleStrategy, Profile as GoogleProfile } from "passport-google-oauth20";
import type { PassportStatic } from "passport";
import { config } from "@/config";
import oauthLinkOrCreateUser from "@/services/auth/oauth-link-or-create-user";

export function setupGoogleStrategy(passport: PassportStatic) {
  if (!config.googleClientId || !config.googleClientSecret) return;

  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleClientId,
        clientSecret: config.googleClientSecret,
        callbackURL: "/api/v1/auth/google/callback",
      },
      async (_accessToken: string, _refreshToken: string, profile: GoogleProfile, done) => {
        try {
          const email = profile.emails && profile.emails[0]?.value ? profile.emails[0].value : null;
          const user = await oauthLinkOrCreateUser({
            provider: "google",
            providerAccountId: profile.id,
            email,
            profile: {
              name: profile.displayName || null,
              avatarUrl: profile.photos && profile.photos[0]?.value ? profile.photos[0].value : null,
            },
          });
          return done(null, { id: user!.id, role: user!.role });
        } catch (err) {
          return done(err as any, undefined);
        }
      }
    )
  );
}

export default setupGoogleStrategy;


