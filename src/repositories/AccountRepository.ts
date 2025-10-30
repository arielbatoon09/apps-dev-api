import { prisma } from "@/shared/prisma";

export const AccountRepository = {
  findByProviderAccount: (provider: string, providerAccountId: string) =>
    prisma.account.findUnique({ where: { provider_providerAccountId: { provider, providerAccountId } } }),
  create: (data: any) => prisma.account.create({ data }),
  findAllByUserId: (userId: string) => prisma.account.findMany({ where: { userId } }),
};

export default AccountRepository;


