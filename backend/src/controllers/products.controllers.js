const requireProducts = require('../models/products.model');

const getAll = async (req, res) => {
  try {
    const products = await requireProducts.findAll();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const product = await requireProducts.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const newProduct = async (req, res) => {
  const { name } = req.body;
  const product = await requireProducts.createProduct(name);
  res.status(201).json(product);
};

module.exports = {
  getAll,
  getById,
  newProduct,
};