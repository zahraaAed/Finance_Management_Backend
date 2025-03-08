const { DataTypes } = require('sequelize');
const db = require('../config/dbconfig.js');

const Category = db.define('category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        
    },
    isDeleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,  // Default value is false to keep existing data unchanged
        allowNull: false
    }
});
module.exports = Category;

