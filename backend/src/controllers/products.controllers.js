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
    res.status(200).json(product);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAll,
  getById,
};