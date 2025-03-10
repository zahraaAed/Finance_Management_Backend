const { DataTypes } = require('sequelize');
const db = require('../config/dbconfig.js');

const ProfitGoal = db.define('profitgoal', {
    goalName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    targetAmount: {
        type: DataTypes.FLOAT,
        allowNull: false,
    },
    currency: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isIn: [['USD', 'EUR', 'GBP', 'INR', 'LB']],
        },
    },
    actualProfit: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
    },
    deadline: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM('Pending', 'Achieved', 'Missed'),
        defaultValue: 'Pending',
    },
});

module.exports = ProfitGoal;
