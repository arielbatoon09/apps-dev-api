export const config = {
  frontendUrl: process.env.FRONTEND_URL || "*",
  refreshTokenTtlSeconds: parseInt(process.env.REFRESH_TOKEN_TTL || "2592000", 10), // 30d
  emailTokenTtlSeconds: parseInt(process.env.EMAIL_TOKEN_TTL || "86400", 10), // 1d
  accessTokenTtlSeconds: parseInt(process.env.ACCESS_TOKEN_TTL || "900", 10), // 15m
  jwtSecret: process.env.JWT_SECRET || "change-me",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
  githubClientId: process.env.GITHUB_CLIENT_ID || "",
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET || "",
  smtp: {
    host: process.env.SMTP_HOST || "",
    port: parseInt(process.env.SMTP_PORT || "587", 10),
    secure: (process.env.SMTP_SECURE || "false").toLowerCase() === "true",
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
    from: process.env.EMAIL_FROM || "no-reply@example.com",
  },
  cookie: {
    name: "rt",
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as "lax" | "strict" | "none",
    path: "/api/v1/auth",
  },
};