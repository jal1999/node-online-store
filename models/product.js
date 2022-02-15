const database = require('../util/database');
const Sequelize = require('sequelize');

const Product = database.define(
    'product',{
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        price: {
            type: Sequelize.DOUBLE,
            allowNull: false
        },
        imageUrl: {
            type: Sequelize.STRING,
            allowNull: false
        }
    }
);

module.exports = Product;