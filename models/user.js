const Sequelize = require('sequelize');
const database = require('../util/database');

const User = database.define('User', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    }
    // Add cart functionality
});

module.exports = User;