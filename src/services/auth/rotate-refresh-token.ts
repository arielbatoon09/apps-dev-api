import TokenRepository from "@/repositories/TokenRepository";
import { TokenType } from "@prisma/client";
import { issueRefreshToken } from "@/services/auth/issue-refresh-token";

export async function rotateRefreshToken(oldToken: string, ttlSeconds: number) {
  const record = await TokenRepository.findByToken(oldToken);
  if (!record || record.type !== TokenType.REFRESH || record.revokedAt || record.consumedAt) {
    return null;
  }
  if (record.expiresAt.getTime() < Date.now()) {
    return null;
  }
  await TokenRepository.consume(record.id);
  return issueRefreshToken(record.userId, ttlSeconds);
}

export default rotateRefreshToken;