import Product from "../models/Product.js";
import mongoose from 'mongoose';

export const create = async (req, res) => {
  try {
    const { name, slug, description, price, category, isFeatured, isActive, thumbnail, stock, tags } = req.body;
    // search for product
    const productExists = await Product.findOne({ slug });
    if (productExists)
      return res.status(400).json({ message: "Product already exists." });
    // product creation
    const product = await Product.create({ 
      name, 
      slug, 
      description, 
      price, 
      category, 
      thumbnail: thumbnail || "",
      stock: stock || 0,
      tags: tags || [],
      isFeatured: isFeatured ?? false, 
      isActive: isActive ?? true 
    });
    res.status(201).json({ message: "Product listing successful.", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const { id }= req.params;
    const { name, slug, description, price } = req.body;
    const productExists = await Product.findById(id);
    if (!productExists)
      return res.status(400).json({ message: "Product does not exist." });

    const productFields = {
         name, slug, description, price, updatedAt: new Date() 
    }

    const product = await Product.updateOne(
        {_id: new mongoose.Types.ObjectId(id)},
        {$set: productFields},);
    res.status(200).json({ message: "Product updated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ==================== EPIC 1: PRODUCT API ====================

// GET /api/inventory - List all products with filtering and pagination
export const listProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      minPrice,
      maxPrice,
      search,
      sortBy = "createdAt",
      sortOrder = "desc"
    } = req.query;

    // Build filter object
    const filter = {};

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Search by name or description
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Sort configuration
    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    // Get total count for pagination metadata
    const total = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/inventory/active - Get only active product listings
export const getActiveProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      category,
      minPrice,
      maxPrice,
      search,
      sortBy = "createdAt",
      sortOrder = "desc"
    } = req.query;

    // Build filter - only active products
    const filter = { isActive: true };

    // Filter by category
    if (category) {
      filter.category = category;
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    // Search by name or description
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } }
      ];
    }

    // Sort configuration
    const sort = { [sortBy]: sortOrder === "asc" ? 1 : -1 };

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Execute query with pagination
    const products = await Product.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(Number(limit));

    // Get total count for pagination metadata
    const total = await Product.countDocuments(filter);

    res.status(200).json({
      products,
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/inventory/featured - Get featured products
export const getFeaturedProducts = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    // Filter for featured and active products
    const filter = { isFeatured: true, isActive: true };

    const products = await Product.find(filter)
      .sort({ createdAt: -1 })
      .limit(Number(limit));

    res.status(200).json({
      products
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
