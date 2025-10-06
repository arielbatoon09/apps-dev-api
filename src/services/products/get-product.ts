import { ProductRepository } from '@/repositories/ProductRepository';

export const getAllProductsService = async () => {
  return ProductRepository.findAll();
};

export const getProductByIdService = async (id: string) => {
  if (!id) {
    throw new Error('Product ID is required');
  }

  const product = await ProductRepository.findById(id);
  if (!product) {
    throw new Error('Product not found');
  }

  return product;
};