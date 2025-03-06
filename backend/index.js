// import all dependencies
import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import multer from "multer";
import cloudinary from "cloudinary"
import EstalishConnectionToDB from "./utils/connectToDB.js";

// initialize config file
dotenv.config();

// setting up express app 
const app = express();
app.use(express.json());
app.use(cors({origin:"*"}));

// importing port from env variables
const PORT = process.env.PORT || 3000;

app.listen(PORT,(req, res)=>{
    console.log("Server is runing at PORT: " + PORT);
    EstalishConnectionToDB(process.env.MONGO_URI);
})