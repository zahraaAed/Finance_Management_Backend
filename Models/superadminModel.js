const { DataTypes } = require('sequelize');
const db = require('../config/dbconfig.js');

const superAdmin= db.define('superadmin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: 'superadmin',
  },
});

superAdmin.sync();

module.exports = superAdmin;
