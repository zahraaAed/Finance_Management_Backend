const { DataTypes, Sequelize } = require('sequelize');
const db = require('../config/dbconfig.js');
const Category = require('./categoryModel');

const RecurringIncome = db.define('RecurringIncome', {
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
            isIn: [['USD', 'EUR', 'GBP', 'INR', 'LBP']],  // You can adjust this to your needs
        },
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false,
        set(value) {
            this.setDataValue('startDate', new Date(value));  // Ensure it's stored as a Date
        },
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false,
        set(value) {
            this.setDataValue('endDate', new Date(value));  // Ensure it's stored as a Date
        },
    },
});

// Define relationship
RecurringIncome.belongsTo(Category, {
    foreignKey: 'categoryId',  // Explicitly define the foreign key
});

// Export the model
module.exports = RecurringIncome;
