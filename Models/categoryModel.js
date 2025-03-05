const { DataTypes } = require('sequelize');
const db = require('../config/dbconfig.js');

const Category = db.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
});
Category.sync({ alter: true });
module.exports = Category;

