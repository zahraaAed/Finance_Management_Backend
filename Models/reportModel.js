const { DataTypes } = require('sequelize');
const db = require('../config/dbconfig.js');
const User = require('./userModel.js');
const superAdmin=require('./superadminModel.js');
const ProfitGoal=require('./profitGoalModel.js')

const Report = db.define('report', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  type: {
    type: DataTypes.ENUM('weekly', 'monthly', 'yearly'),
    allowNull: false,
    defaultValue: 'monthly',
  },
});

User.hasMany(Report);
Report.belongsTo(User);

superAdmin.hasMany(Report);
Report.belongsTo(superAdmin);




// Instead of using only Report.sync(), use db.sync() to sync all models
db.sync({ force: false })  // Set force: true only when you want to reset the tables
  .then(() => {
    console.log('Database synchronized now');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });


module.exports = Report;
