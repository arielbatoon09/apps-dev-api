import { TokenType } from "@prisma/client";
import { randomToken } from "@/utils/tokens";
import TokenRepository from "@/repositories/TokenRepository";

export async function createEmailVerificationToken(userId: string, ttlSeconds: number) {
  const token = randomToken(32);
  const expiresAt = new Date(Date.now() + ttlSeconds * 1000);
  const created = await TokenRepository.create({ userId, type: TokenType.EMAIL_VERIFY, token, expiresAt });
  return { token: created.token, expiresAt };
}

export default createEmailVerificationToken;