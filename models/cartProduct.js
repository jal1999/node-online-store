const Sequelize = require('sequelize');
const database = require('../util/database');

module.exports = database.define('cartProduct',
    {
        id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        quantity: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });