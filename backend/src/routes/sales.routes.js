const salesRoutes = require('express').Router();
const salesController = require('../controllers/sales.controllers');
const { validateId, validateQuantity } = require('../middlewares/saleValidation');
const { validateProdExistence } = require('../services/validations/validateNewSale.service');

salesRoutes.get('/', salesController.getSales);
salesRoutes.get('/:id', salesController.getSaleById);
salesRoutes.post(
  '/', 
  validateId, 
  validateQuantity,
  validateProdExistence, 
  salesController.addNewSale,
);
salesRoutes.delete('/:id', salesController.deleteSaleById);

module.exports = salesRoutes;