import { ProductRepository } from '@/repositories/ProductRepository';

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export const createProductService = async (data: CreateProductData) => {
  // Validate required fields
  if (!data.name || !data.description || data.price === undefined || data.stock === undefined) {
    throw new Error('All fields (name, description, price, stock) are required');
  }

  // Validate price and stock are positive numbers
  if (data.price < 0 || data.stock < 0) {
    throw new Error('Price and stock must be positive numbers');
  }

  // Create the product
  return ProductRepository.create({
    name: data.name.trim(),
    description: data.description.trim(),
    price: data.price,
    stock: data.stock
  });
};
