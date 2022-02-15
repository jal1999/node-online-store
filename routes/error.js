const errorController = require('../controllers/error');
const Router = require('express').Router();

Router.use('/', errorController);

module.exports = Router;