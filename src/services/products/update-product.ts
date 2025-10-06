import { ProductRepository } from '@/repositories/ProductRepository';

export interface UpdateProductData {
  name?: string;
  description?: string;
  price?: number;
  stock?: number;
}

export const updateProductService = async (id: string, data: UpdateProductData) => {
  if (!id) {
    throw new Error('Product ID is required');
  }

  // Check if product exists
  const existingProduct = await ProductRepository.findById(id);
  if (!existingProduct) {
    throw new Error('Product not found');
  }

  // Validate price and stock if provided
  if (data.price !== undefined && data.price < 0) {
    throw new Error('Price must be a positive number');
  }

  if (data.stock !== undefined && data.stock < 0) {
    throw new Error('Stock must be a positive number');
  }

  // Prepare update data
  const updateData: UpdateProductData = {};
  if (data.name !== undefined) updateData.name = data.name.trim();
  if (data.description !== undefined) updateData.description = data.description.trim();
  if (data.price !== undefined) updateData.price = data.price;
  if (data.stock !== undefined) updateData.stock = data.stock;

  // Update the product
  return ProductRepository.update(id, updateData);
};
