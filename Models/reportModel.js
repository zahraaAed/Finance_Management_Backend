const { DataTypes } = require('sequelize');
const db = require('../config/dbconfig.js');
const User = require('./userModel.js');

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

Report.sync();

module.exports = Report;
