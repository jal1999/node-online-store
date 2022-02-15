const Sequelize = require('sequelize');
const database = require('../util/database');

module.exports = database.define('order',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        totalCost: {
            type: Sequelize.DOUBLE,
        }
    })