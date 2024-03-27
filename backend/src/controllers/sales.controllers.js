const salesModel = require('../models/sales.model');

const getSales = async (req, res) => {
  const sales = await salesModel.getAll();
  res.status(200).json(sales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesModel.getById(id);
  if (!sale) return res.status(404).json({ message: 'Sale not found' });
  res.status(200).json(sale);
};

module.exports = { getSales, getSaleById };