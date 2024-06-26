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

const updateProduct = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name } = req.body;

  try {
    const updated = await requireProducts.updateProductById(id, name);

    if (updated) {
      res.status(200).json({ id, name });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await requireProducts.deleteProductById(id);

    if (deleted) {
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  getAll,
  getById,
  newProduct,
  updateProduct,
  deleteProduct,
};