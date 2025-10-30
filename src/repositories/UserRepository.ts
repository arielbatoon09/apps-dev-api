import { prisma } from "@/shared/prisma";

export const UserRepository = {
  findById: (id: string) => prisma.user.findUnique({ where: { id } }),
  findByEmail: (email: string) => prisma.user.findUnique({ where: { email } }),
  create: (data: any) => prisma.user.create({ data }),
  updateById: (id: string, data: any) => prisma.user.update({ where: { id }, data }),
};

export default UserRepository;