import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); 

const sequelize = new Sequelize('Finance_Management', 'root', '', {
    dialect: 'mariadb',  // Change 'mysql' to 'mariadb'
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

export default sequelize;
