const { DataTypes, Sequelize } = require('sequelize'); // Include Sequelize
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
     startDate: {
           type: DataTypes.DATE,
           allowNull: false,
       },
       endDate: {
           type: DataTypes.DATE,
           allowNull: false,
           validate: {
               isAfter: Sequelize.col('startDate'), // Now Sequelize is properly defined
           }
        },
        isDeleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,  // Default value is false to keep existing data unchanged
            allowNull: false
        }
});

FixedIncome.belongsTo(Category);
module.exports = FixedIncome;