import ProductRepository from "@/repositories/ProductRepository";

// Get All Products regardles if Active / Not
export async function getAllProductsService(userId: string) {
  const result = await ProductRepository.findAllByUser(userId);

  return {
    status: "success",
    message: "Fetched all products successfully!",
    data: result
  }
}

// Get All Active Products
export async function getAllActiveProductsService() {
  const result = await ProductRepository.findAllActive();

  return {
    status: "success",
    message: "Fetched all active products successfully!",
    data: result
  }
}

export async function getProductByIdService(id: string) {
  // Check if Product ID is provided
  if (!id) {
    return { status: "error", message: "Product ID was not provided!" };
  }

  // Check if Product is existing in the Database
  const existingProduct = await ProductRepository.findById(id);
  if (!existingProduct) {
    return { status: "error", message: "Product is not found!" };
  }

  return {
    status: "success",
    message: "Fetched the product successfully!",
    data: existingProduct
  }
}