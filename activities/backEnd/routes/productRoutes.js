import express from "express";
import {
  create,
  update,
  listProducts,
  getActiveProducts,
  getFeaturedProducts,
} from "../controllers/inventoryController.js";

const router = express.Router();

// POST routes
router.post("/create", create);
router.put("/update/:id", update);

// GET routes - Epic 1: PRODUCT API

// GET /api/inventory - List all products with filtering and pagination
router.get("/", listProducts);

// GET /api/inventory/active - Get only active product listings
router.get("/active", getActiveProducts);

// GET /api/inventory/featured - Get featured products
router.get("/featured", getFeaturedProducts);


export default router;