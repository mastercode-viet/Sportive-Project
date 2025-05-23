const Product = require("../models/Product");

// GET all products
const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// POST new product
const createProduct = async (req, res) => {
  const product = new Product(req.body);
  await product.save();
  res.status(201).json(product);
};

module.exports = { getProducts, createProduct };
