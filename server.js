import express from 'express';
import sequilize from './config/dbconfig.js';
import dotenv from 'dotenv';
import cors from 'cors';
import db from "./config/dbconfig.js";
import userRoute from "./Routes/userRoute.js";
import loginRoute from "./Routes/loginRoute.js";
import reportRoute from "./Routes/reportRoute.js";
import profitGoalRoute from "./Routes/profitGoalRoute.js";






dotenv.config();
const app = express();


//port
const port = process.env.PORT || 3000; // Change to 3000 or another available port

sequilize.sync()   

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));

//routes
app.get('/',(req,res)=>{
    res.send("hello world")
   })
app.use("/api/user", userRoute);
app.use("/api/login", loginRoute);
app.use("/api/reports", reportRoute);
app.use("/api/profitGoal", profitGoalRoute);





   //server

app.listen(port, () => {
    console.log(`server is running on the port ${port}`);
  });