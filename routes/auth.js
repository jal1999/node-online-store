const authController = require('../controllers/auth');
const Router = require('express').Router();

Router.get('/login', authController.getLogin);

Router.post('/login', authController.postLogin);

Router.get('/signup', authController.getSignup);

Router.post('/signup', authController.postSignup);

Router.get('/logout', authController.getLogout);

Router.get('/reset-password', authController.getResetPassword);

Router.post('/reset-password', authController.postResetPassword);

module.exports = Router;