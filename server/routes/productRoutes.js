import express from "express";
import {
  getProducts,
  getProductById,
} from "../controllers/productController.js";
const router = express.Router();

// products route URL prefix => ('/api/products')
router.get("/", getProducts);
router.get("/:id", getProductById);

export default router;
