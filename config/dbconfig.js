import { Sequelize } from "sequelize";

const sequelize = new Sequelize('FINTECH', 'root', 'Zahraa123', {
    dialect: 'mysql',
    host: "localhost",
    port: '3306',
  
 
});

const connect = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {  
        console.error('Unable to connect to the database: ', error);
    };
};


export default sequelize ;