import Product from "../models/Product.js";


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

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all products

export const getAllProducts = async (req, res) => {
  try {

    console.log("Fetching data from MongoDB...");
    await fakeDatabaseDelay();

    const products = await Product.find();
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
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
