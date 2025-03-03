const { DataTypes, Sequelize} = require('sequelize');
const db = require('../config/dbconfig.js');
const Category = require('./categoryModel.js');

const RecurringExpense = db.define('RecurringExpense', {
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
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
    },
});

RecurringExpense.belongsTo(Category);
module.exports = RecurringExpense;