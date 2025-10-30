// Types might not exist for passport-github2; use any to avoid TS friction
// eslint-disable-next-line @typescript-eslint/no-var-requires
const GithubStrategy = require("passport-github2").Strategy as any;
import type { PassportStatic } from "passport";
import { config } from "@/config";
import oauthLinkOrCreateUser from "@/services/auth/oauth-link-or-create-user";

export function setupGithubStrategy(passport: PassportStatic) {
  if (!config.githubClientId || !config.githubClientSecret) return;

  passport.use(
    new GithubStrategy(
      {
        clientID: config.githubClientId,
        clientSecret: config.githubClientSecret,
        callbackURL: "/api/v1/auth/github/callback",
        scope: ["user:email"],
      },
      async (_accessToken: string, _refreshToken: string, profile: any, done: any) => {
        try {
          let email: string | null = null;
          if (Array.isArray(profile.emails) && profile.emails.length > 0) {
            email = profile.emails[0].value;
          }
          const user = await oauthLinkOrCreateUser({
            provider: "github",
            providerAccountId: profile.id,
            email,
            profile: {
              name: profile.displayName || profile.username || null,
              avatarUrl: profile.photos && profile.photos[0]?.value ? profile.photos[0].value : null,
            },
          });
          return done(null, { id: user!.id, role: user!.role });
        } catch (err) {
          return done(err, undefined);
        }
      }
    )
  );
}

export default setupGithubStrategy;


