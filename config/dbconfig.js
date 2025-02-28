const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const sequelize = new Sequelize('Finance_Management', 'root', '', {
  dialect: 'mysql',
  host: 'localhost',
  port: process.env.PORT ? Number(process.env.PORT) : 3306,
  logging: console.log,
});

const connect = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

// Call the function to connect
connect();

module.exports = sequelize;
