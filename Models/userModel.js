// usersModels.js
import { DataTypes } from 'sequelize';
import db from '../config/dbconfig.js';

const User = db.define('user', {
 id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   autoIncrement: true,
   
 },
 email: {
   type: DataTypes.STRING(255),
   allowNull: false,
   unique: true
 },
 firstName: {
   type: DataTypes.STRING(255),
   allowNull: false,
   unique: false
 },
 lastName: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: false
  },
 password: {
   type: DataTypes.STRING(255),
   allowNull: false
 },

 role: {
   type: DataTypes.ENUM('admin', 'superadmin',),
   allowNull: false,
   defaultValue: 'admin'
 }
});




export default User