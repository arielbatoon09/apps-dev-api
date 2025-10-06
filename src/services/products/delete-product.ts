import { PrismaClient } from '@prisma/client';
import { ProductRepository } from '@/repositories/ProductRepository';

const prisma = new PrismaClient();

export const softDeleteProductService = async (id: string) => {
  if (!id) {
    throw new Error('Product ID is required');
  }

  // Check if product exists
  const existingProduct = await ProductRepository.findById(id);
  if (!existingProduct) {
    throw new Error('Product not found');
  }

  // Check if product is already soft deleted
  if (!existingProduct.isActive) {
    throw new Error('Product is already deleted');
  }

  // Perform soft delete
  return ProductRepository.delete(id);
};

export const hardDeleteProductService = async (id: string) => {
  if (!id) {
    throw new Error('Product ID is required');
  }

  // Check if product exists
  const existingProduct = await prisma.product.findUnique({ where: { id } });
  if (!existingProduct) {
    throw new Error('Product not found');
  }

  // Perform hard delete
  return prisma.product.delete({ where: { id } });
};

export const restoreProductService = async (id: string) => {
  if (!id) {
    throw new Error('Product ID is required');
  }

  // Check if product exists
  const existingProduct = await prisma.product.findUnique({ where: { id } });
  if (!existingProduct) {
    throw new Error('Product not found');
  }

  // Check if product is already active
  if (existingProduct.isActive) {
    throw new Error('Product is already active');
  }

  // Restore the product
  return prisma.product.update({ 
    where: { id }, 
    data: { isActive: true } 
  });
};
