import TokenRepository from "@/repositories/TokenRepository";
import UserRepository from "@/repositories/UserRepository";
import { TokenType } from "@prisma/client";

export async function verifyEmailToken(token: string) {
  const record = await TokenRepository.findByToken(token);
  if (!record || record.type !== TokenType.EMAIL_VERIFY || record.revokedAt || record.consumedAt) {
    return false;
  }
  if (record.expiresAt.getTime() < Date.now()) {
    return false;
  }
  await TokenRepository.consume(record.id);
  await UserRepository.updateById(record.userId, { isEmailVerified: true });
  return true;
}

export default verifyEmailToken;
