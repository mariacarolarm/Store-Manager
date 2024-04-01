const route = require('express').Router();
const controller = require('../controllers/products.controllers');
const validProduct = require('../middlewares/productValidation');

route.get('/', controller.getAll);
route.get('/:id', controller.getById);
route.post('/', validProduct, controller.newProduct);
route.put('/:id', validProduct, controller.updateProduct);

module.exports = route;