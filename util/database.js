const { Sequelize } = require('sequelize');
const database = new Sequelize('online store', 'root', '5477Kiss', { dialect: 'mysql', host: 'localhost' });

module.exports = database;