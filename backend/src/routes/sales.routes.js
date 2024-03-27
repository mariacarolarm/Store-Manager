const salesRoutes = require('express').Router();
const salesController = require('../controllers/sales.controllers');

salesRoutes.get('/', salesController.getSales);
salesRoutes.get('/:id', salesController.getSaleById);

module.exports = salesRoutes;