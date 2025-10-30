import ProductRepository from "@/repositories/ProductRepository";
import { ProductData } from "@/types/product";


export async function createProductService(data: ProductData, userId: string) {
  // Validate required fields
  if (!data.name || !data.description || data.price == null || data.stock == null) {
    return { status: "error", message: "Missing fields!" };
  }

  // Validate price and stock
  if (data.price < 1 || data.stock < 1) {
    return { status: "error", message: "Price / Stock are not valid numbers!" };
  }

  // Create Product
  const result = await ProductRepository.create({
    name: data.name,
    description: data.description,
    price: data.price,
    stock: data.stock,
    userId,
  })

  return {
    status: "success",
    message: "Created Product Successfully!",
    data: result
  }
}