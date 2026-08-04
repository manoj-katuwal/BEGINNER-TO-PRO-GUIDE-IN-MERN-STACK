import Product from "../models/Product.js";
import redisClient from "../config/redis.js";

const cache = {};

// Create a new product

const fakeDatabaseDelay = () => {
  return new Promise((resolve) => {
    setTimeout(resolve, 3000);
  });
};

export const createProduct = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;

    const product = await Product.create({
      name,
      price,
      category,
      stock,
    });

    await redisClient.del("products");
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products

export const getAllProducts = async (req, res) => {
  try {
    const cachedProducts = await redisClient.get("products");

    if (cachedProducts) {
      console.log("Fetching data from Redis cache...");
      return res.status(200).json(JSON.parse(cachedProducts));
    }

    console.log("Fetching data from MongoDB...");
    await fakeDatabaseDelay();

    const products = await Product.find();
    await redisClient.set("products", JSON.stringify(products), {
      EX: 60,
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single product by ID

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a product by ID

export const updateProductById = async (req, res) => {
  try {
    const { name, price, category, stock } = req.body;

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        category,
        stock,
      },
      { new: true },
    );

    // delete cache.products;

    await redisClient.del("products");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    // delete cache.products;
    await redisClient.del("products");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
