import AccountRepository from "@/repositories/AccountRepository";
import UserRepository from "@/repositories/UserRepository";

type Profile = { email?: string | null; name?: string | null; avatarUrl?: string | null };

export async function oauthLinkOrCreateUser(params: {
  provider: string;
  providerAccountId: string;
  email?: string | null;
  profile?: Profile;
}) {
  const { provider, providerAccountId, email, profile } = params;
  const existingAccount = await AccountRepository.findByProviderAccount(provider, providerAccountId);
  if (existingAccount) {
    return UserRepository.findById(existingAccount.userId);
  }

  let user = null;
  if (email) {
    user = await UserRepository.findByEmail(email);
  }

  if (!user) {
    user = await UserRepository.create({
      email: email ?? null,
      name: profile?.name ?? null,
      avatarUrl: profile?.avatarUrl ?? null,
      isEmailVerified: true,
    });
  }

  await AccountRepository.create({
    userId: user!.id,
    provider,
    providerAccountId,
  });

  return user;
}

export default oauthLinkOrCreateUser;


