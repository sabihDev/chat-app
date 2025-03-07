// import all dependencies
import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import cloudinary from "cloudinary"
import EstalishConnectionToDB from "./utils/connectToDB.js";
import { userRoutes } from "./routes/user.routes.js";
// import { Server } from "socket.io";


// initialize config file
dotenv.config();

// setting up express app 
const app = express();

// setting up socket.io
// const server = http.createServer(app);

// const io = new Server(server, {
//   cors: {
//     origin: "*",
//   },
// });

app.use(express.json());
app.use(cookieParser());
app.use(cors({origin:"*"}));

// importing port from env variables
const PORT = process.env.PORT || 3000;

app.use("/api/user", userRoutes);

app.listen(PORT,(req, res)=>{
    console.log("Server is runing at PORT: " + PORT);
    EstalishConnectionToDB(process.env.MONGO_URI);
})