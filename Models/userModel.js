const { DataTypes } = require('sequelize');
const db = require('../config/dbconfig.js');

const User = db.define('user', {
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
  userName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: false,
  },
  
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: 'admin',
  },
});

User.sync();

module.exports = User;
