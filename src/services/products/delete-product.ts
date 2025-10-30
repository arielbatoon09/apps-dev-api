import ProductRepository from "@/repositories/ProductRepository";

// Hard Delete Product Service
export async function hardDeleteProductService(id: string, userId: string) {
  // Check if Product ID is provided
  if (!id) {
    return { status: "error", message: "Product ID was not provided!" };
  }

  // Check if Product is existing in the Database
  const existingProduct = await ProductRepository.findById(id);
  if (!existingProduct) {
    return { status: "error", message: "Product is not found!" };
  }
  if (existingProduct.userId !== userId) {
    return { status: "error", message: "You do not own this product." };
  }

  // Delete the Product from the Database
  await ProductRepository.delete(id);

  return {
    status: "success",
    message: `Deleted Product ID: ${id} Successfully!`,
    data: null
  }
}

// Soft Delete Product Service
export async function softDeleteProductService(id: string, userId: string) {
  // Check if Product ID is provided
  if (!id) {
    return { status: "error", message: "Product ID was not provided!" };
  }

  // Check if Product is existing in the Database
  const existingProduct = await ProductRepository.findById(id);
  if (!existingProduct) {
    return { status: "error", message: "Product is not found!" };
  }
  if (existingProduct.userId !== userId) {
    return { status: "error", message: "You do not own this product." };
  }

  // Deactivate Product from the Database
  await ProductRepository.softDelete(id);

  return {
    status: "success",
    message: `Deactivated Product ID: ${id} Successfully!`,
    data: null
  }
}