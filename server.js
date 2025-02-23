import express from 'express';
import sequilize from './config/dbconfig.js';
import dotenv from 'dotenv';
import cors from 'cors';
import db from "./config/dbconfig.js";

dotenv.config();
const app = express();


//port
const port = process.env.PORT || 3000; // Change to 3000 or another available port

sequilize.sync()   

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors("*"));

app.get('/',(req,res)=>{
    res.send("hello world")
   })

   //server

app.listen(port, () => {
    console.log(`server is running on the port ${port}`);
  });