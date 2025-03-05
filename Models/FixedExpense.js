const { DataTypes, Sequelize } = require('sequelize'); // Include Sequelize
const db = require('../config/dbconfig.js');
const Category = require('./categoryModel');
const Report=require('./reportModel.js');

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
     startDate: {
           type: DataTypes.DATE,
           allowNull: false,
       },
       endDate: {
           type: DataTypes.DATE,
           allowNull: false,
           validate: {
               isAfter: Sequelize.col('startDate'), // Now Sequelize is properly defined
           },
        },
    
    });
    
    // Define relationships (these are needed to link models together)
 



FixedExpense.sync();

FixedExpense.belongsTo(Category);
FixedExpense.belongsTo(Report);
module.exports = FixedExpense;