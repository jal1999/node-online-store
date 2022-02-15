const customerController = require('../controllers/customerController');
const express = require('express');
const Router = express.Router();

Router.get('/', customerController.getStore);

Router.get('/product-details/:pid', customerController.getDetails);

Router.post('/add-to-cart/:productId', customerController.postAddToCart);

Router.post('/delete-from-cart/:productId', customerController.postDeleteFromCart);

Router.get('/cart', customerController.getCart);

Router.post('/order/:userId', customerController.postOrder);

Router.get('/your-orders', customerController.getYourOrders);

module.exports = Router;