import { Router } from "express";
import ProductController from "@/controllers/ProductController";

const router = Router();

router.get("/", (req, res) => {
  res.send("API is running...");
});

// Product Endpoints
router.get("/v1/product-list", ProductController.getAllProducts);
router.get("/v1/product-active-list", ProductController.getAllActiveProducts);
router.post("/v1/product-get-by-id", ProductController.getProductById);
router.post("/v1/product-create", ProductController.createProduct);
router.post("/v1/product-update", ProductController.updateProduct);
router.post("/v1/product-hard-delete", ProductController.hardDeleteProduct);
router.post("/v1/product-soft-delete", ProductController.softDeleteProduct);
router.post("/v1/product-restore", ProductController.restoreProduct);

export default router;