const route = require('express').Router();
const controller = require('../controllers/products.controllers');

route.get('/', controller.getAll);
route.get('/:id', controller.getById);
route.post('/', controller.newProduct);

module.exports = route;