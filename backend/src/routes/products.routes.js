const route = require('express').Router();
const controller = require('../controllers/products.controllers');

route.get('/', controller.getAll);
route.get('/:id', controller.getById);

module.exports = route;