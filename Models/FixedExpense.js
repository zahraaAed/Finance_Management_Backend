const { DataTypes } = require('sequelize');
const db = require('../config/dbconfig.js');
const Category = require('./categoryModel');

const FixedExpense = db.define('FixedExpense', {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['USD', 'EUR', 'GBP', 'INR', 'LBP']],
        },
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

FixedExpense.belongsTo(Category);
module.exports = FixedExpense;