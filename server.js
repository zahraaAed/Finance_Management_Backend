const express = require('express');
const sequelize = require('./config/dbconfig.js');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require("./config/dbconfig.js");
const userRoute = require("./Routes/userRoute.js");
const loginRoute = require("./Routes/loginRoute.js");
const superAdminRoute =require("./Routes/superAdminRoute.js");
const profitGoalRoute = require("./Routes/profitGoalRoute.js");
const incomeRoute=require("./Routes/incomeRoutes.js");

dotenv.config();
const app = express();

// Port
const port = process.env.PORT || 4000;
sequelize.sync();

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
app.use("/api/income", incomeRoute);


// Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
