const { DataTypes } = require('sequelize');
const db = require('../config/dbconfig.js');
const Category = require('./categoryModel');

const FixedIncome = db.define('FixedIncome', {
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

FixedIncome.belongsTo(Category);
module.exports = FixedIncome;