import ProductRepository from "@/repositories/ProductRepository";
import { ProductData } from "@/types/product";

// Update Product
export async function updateProductService(id: string, data: ProductData) {
  // Check if Product ID is provided
  if (!id) {
    return { status: "error", message: "Product ID was not provided!" };
  }

  // Check if the Product ID is existing in the Database
  const existingProduct = await ProductRepository.findById(id);
  if (!existingProduct) {
    return { status: "error", message: "Product is not found!" };
  }

  // Validate price and stock are valid numbers
  if (data.price < 1 || data.stock < 1) {
    return { status: "error", message: "Price / Stock are not valid numbers!" };
  }

  // Update the Product Data
  const result = await ProductRepository.update(id, data);

  return {
    status: "success",
    message: "Updated Product Successfully!",
    data: result
  }
}

// Restore Product / Activate Product
export async function restoreProductService(id: string) {
  // Check if Product ID is provided
  if (!id) {
    return { status: "error", message: "Product ID was not provided!" };
  }

  // Check if Product is existing in the Database
  const existingProduct = await ProductRepository.findById(id);
  if (!existingProduct) {
    return { status: "error", message: "Product is not found!" };
  }

  // Restore Product
  const result = await ProductRepository.restoreProduct(id);

  return {
    status: "success",
    message: `Activated Product ID: ${id} Successfully!`,
    data: result
  }
}