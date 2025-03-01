const { DataTypes } = require('sequelize');
const db = require('../config/dbconfig.js');

const Category = db.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
});
Category.sync({ alter: true });
module.exports = Category;
