const adminController = require('../controllers/adminController');
const express = require('express');

const Router = express.Router();

Router.post('/add-product', adminController.postAddProduct);

Router.get('/add-product', adminController.getAddProduct);

Router.get("/your-products", adminController.getYourProducts);

Router.get('/edit/:productId', adminController.getEditProduct);

Router.post('/edit-product', adminController.postEditProduct);

Router.post('/delete/:productId', adminController.postDeleteProduct);

module.exports = Router;