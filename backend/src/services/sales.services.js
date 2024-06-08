const { updateSaleProductQuantity } = require('../models/sales.model');
const productsModel = require('../models/products.model');
const salesModel = require('../models/sales.model');

const updateQuantity = async (saleId, productId, quantity) => {
  const sale = await salesModel.getById(saleId);
  if (!sale) throw new Error('Sale not found');

  const product = await productsModel.findById(productId);
  if (!product) throw new Error('Product not found');

  await updateSaleProductQuantity(saleId, productId, quantity);
};

module.exports = { updateQuantity };