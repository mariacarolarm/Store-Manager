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

const addNewSale = async (req, res) => {
  const newSale = await salesModel.newSale(req.body);
  res.status(201).json(newSale);
};

const deleteSaleById = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await salesModel.deleteSale(id);

    if (deleted) {
      res.sendStatus(204);
    } else {
      res.status(404).json({ message: 'Sale not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { getSales, getSaleById, addNewSale, deleteSaleById };