const Sequelize = require('sequelize');
const database = require('../util/database');

module.exports = database.define('cart',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        }
    });