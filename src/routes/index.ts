import { Router } from 'express';
import { ProductController } from '@/controllers/ProductController';


const router = Router();

// Product Routes
router.get('/product-list', ProductController.listProducts);
router.post('/product-create', ProductController.createProduct);
router.post('/product-get-by-id', ProductController.getProductById);
router.post('/product-update', ProductController.updateProduct);
router.post('/product-soft-delete', ProductController.softDeleteProduct);
router.post('/product-hard-delete', ProductController.hardDeleteProduct);
router.post('/product-restore', ProductController.restoreProduct);

export default router;