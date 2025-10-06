import { Request, Response } from 'express';
import { createProductService, getAllProductsService, getProductByIdService, updateProductService, softDeleteProductService, hardDeleteProductService, restoreProductService } from '@/services/products';

export const ProductController = {
  async createProduct(req: Request, res: Response) {
    try {
      const product = await createProductService(req.body);
      res.status(201).json(product);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  async listProducts(req: Request, res: Response) {
    try {
      const products = await getAllProductsService();
      res.json(products);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  },

  async getProductById(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ message: 'Product ID is required' });
      }
      const product = await getProductByIdService(id);
      res.json(product);
    } catch (err: any) {
      res.status(404).json({ message: err.message });
    }
  },

  async updateProduct(req: Request, res: Response) {
    try {
      const { id, ...updateData } = req.body;
      if (!id) {
        return res.status(400).json({ message: 'Product ID is required' });
      }
      const product = await updateProductService(id, updateData);
      res.json(product);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  async softDeleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ message: 'Product ID is required' });
      }
      await softDeleteProductService(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  async hardDeleteProduct(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ message: 'Product ID is required' });
      }
      await hardDeleteProductService(id);
      res.status(204).send();
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  },

  async restoreProduct(req: Request, res: Response) {
    try {
      const { id } = req.body;
      if (!id) {
        return res.status(400).json({ message: 'Product ID is required' });
      }
      const product = await restoreProductService(id);
      res.json(product);
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
};