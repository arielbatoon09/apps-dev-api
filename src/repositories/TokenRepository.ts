import { prisma } from "@/shared/prisma";
import { TokenType } from "@prisma/client";

export const TokenRepository = {
  create: (data: { userId: string; type: TokenType; token: string; expiresAt: Date }) =>
    prisma.token.create({ data }),
  findByToken: (token: string) => prisma.token.findUnique({ where: { token } }),
  consume: (id: string) => prisma.token.update({ where: { id }, data: { consumedAt: new Date() } }),
  revokeAllOfTypeForUser: (userId: string, type: TokenType) =>
    prisma.token.updateMany({ where: { userId, type, revokedAt: null }, data: { revokedAt: new Date() } }),
};

export default TokenRepository;


