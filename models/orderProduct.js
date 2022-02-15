const Sequelize = require('sequelize');
const database = require('../util/database');

module.exports = database.define('orderProduct',
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false
        }
    })