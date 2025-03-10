const express = require('express');
const sequelize = require('./config/dbconfig.js');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require("./config/dbconfig.js");
const userRoute = require("./Routes/userRoute.js");
const loginRoute = require("./Routes/loginRoute.js");
const superAdminRoute =require("./Routes/superAdminRoute.js");
const profitGoalRoute = require("./Routes/profitGoalRoute.js");
const fixedIncomeRoutes = require('./Routes/fixedIncomeRoutes.js');
const recurringIncomeRoutes = require('./Routes/recurringIncomeRoutes');
const fixedexpenseRoute=require("./Routes/fixedexpenseRoute.js");
const recurringexpenseRoute=require("./Routes/recurringexpenseRoute.js");
const Category=require('./Routes/categoryRoutes.js');
const reportRoute=require("./Routes/reportRoute.js");
require('./relations');

dotenv.config();
const app = express();

// Port
const port = process.env.PORT;
sequelize.sync();


// Sync the database models
db.sync({ alter: true })
  .then(() => {
    console.log('Database schema synchronized!');
  })
  .catch((err) => {
    console.error('Error syncing database schema:', err);
  });
// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));

// Routes
app.get('/', (req, res) => {
    res.send("hello world");
});
app.use("/api/user", userRoute);
app.use("/api/login", loginRoute);
app.use("/api/superAdmin",superAdminRoute);
app.use("/api/profitGoal", profitGoalRoute);
app.use('/api/fixedIncome', fixedIncomeRoutes);
app.use('/api/recuringIncome', recurringIncomeRoutes);
app.use('/api/fixedExpense', fixedexpenseRoute);
app.use ('/api/recuringExpense', recurringexpenseRoute);
app.use('/api/report', reportRoute);
app.use('/api/category', Category);

// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
