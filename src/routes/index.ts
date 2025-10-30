import { Router } from "express";
import ProductController from "@/controllers/ProductController";
import authRoutes from "@/routes/auth.routes";
import { authenticateJwt, requireRole } from "@/middlewares/auth";
import { Role } from "@prisma/client";

const router = Router();

router.get("/", (req, res) => {
  res.send("API is running...");
});

// Auth Endpoints
router.use("/v1/auth", authRoutes);

// Product Endpoints (JWT required for all; ADMIN for management)
router.use("/v1", authenticateJwt);

router.get("/v1/product-active-list", ProductController.getAllActiveProducts); // USER or ADMIN
router.post("/v1/product-get-by-id", ProductController.getProductById); // USER or ADMIN

router.get("/v1/product-list", requireRole([Role.ADMIN]), ProductController.getAllProducts);
router.post("/v1/product-create", requireRole([Role.ADMIN]), ProductController.createProduct);
router.post("/v1/product-update", requireRole([Role.ADMIN]), ProductController.updateProduct);
router.post("/v1/product-hard-delete", requireRole([Role.ADMIN]), ProductController.hardDeleteProduct);
router.post("/v1/product-soft-delete", requireRole([Role.ADMIN]), ProductController.softDeleteProduct);
router.post("/v1/product-restore", requireRole([Role.ADMIN]), ProductController.restoreProduct);

export default router;