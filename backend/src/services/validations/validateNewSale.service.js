const { findById } = require('../../models/products.model');

const validateProdExistence = async (req, res, next) => {
  const sale = req.body;

  const products = await Promise.all(
    sale.map(async (product) => {
      const productId = await findById(product.productId);
      return productId;
    }),
  ).then((data) => data.every((valid) => valid));

  if (!products) {
    return res.status(404).json({ message: 'Product not found' });
  }
  next();
};

module.exports = { validateProdExistence };