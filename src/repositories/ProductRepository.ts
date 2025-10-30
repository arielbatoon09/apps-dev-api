import { Prisma } from "@prisma/client";
import { ProductData } from "@/types/product";
import { prisma } from "@/shared/prisma";

class ProductRepository {
  async findAllByUser(userId: string) {
    return await prisma.product.findMany({ where: { userId }, orderBy: { name: "asc" } });
  }

  async findAllActive() {
    return await prisma.product.findMany({ where: { isActive: true }, orderBy: { name: "asc" } });
  }

  async create(data: Prisma.ProductUncheckedCreateInput) {
    return await prisma.product.create({ data });
  }

  async findById(id: string) {
    return await prisma.product.findFirst({ where: { id } });
  }

  async update(id: string, data: Partial<ProductData>) {
    return await prisma.product.update({ where: { id }, data });
  }

  async delete(id: string) {
    return await prisma.product.delete({ where: { id } });
  }

  async softDelete(id: string) {
    return await prisma.product.update({ where: { id }, data: { isActive: false } });
  }

  async restoreProduct(id: string) {
    return await prisma.product.update({ where: { id }, data: { isActive: true } });
  }
}

export default new ProductRepository();