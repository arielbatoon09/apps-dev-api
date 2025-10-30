import { randomToken } from "@/utils/tokens";
import TokenRepository from "@/repositories/TokenRepository";
import { TokenType } from "@prisma/client";

export async function issueRefreshToken(userId: string, ttlSeconds: number) {
  const token = randomToken(48);
  const expiresAt = new Date(Date.now() + ttlSeconds * 1000);
  await TokenRepository.revokeAllOfTypeForUser(userId, TokenType.REFRESH);
  const created = await TokenRepository.create({ userId, type: TokenType.REFRESH, token, expiresAt });
  return { token: created.token, expiresAt };
}

export default issueRefreshToken;


