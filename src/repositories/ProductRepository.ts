import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const ProductRepository = {
  async create(data: { name: string; description: string; price: number; stock: number }) {
    return prisma.product.create({ data });
  },

  async findAll() {
    return prisma.product.findMany({ where: { isActive: true }, orderBy: { id: 'asc' } });
  },

  async findById(id: string) {
    return prisma.product.findUnique({ where: { id, isActive: true } });
  },

  async update(id: string, data: Partial<{ name: string; description: string; price: number; stock: number }>) {
    return prisma.product.update({ where: { id }, data });
  },

  async delete(id: string) {
    return prisma.product.update({ where: { id }, data: { isActive: false } });
  }
};