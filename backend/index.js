// import all dependencies
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import multer from "multer";
import cloudinary from "cloudinary";
import EstalishConnectionToDB from "./utils/connectToDB.js";
import { userRoutes } from "./routes/user.routes.js";
import { messageRoutes } from "./routes/message.routes.js";
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

app.use(express.json({ limit: "10mb" })); // Increase limit for Base64 images
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Support URL-encoded bodies

app.use(cookieParser());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// importing port from env variables
const PORT = process.env.PORT || 3000;

app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);

app.listen(PORT, (req, res) => {
  console.log("Server is runing at PORT: " + PORT);
  EstalishConnectionToDB(process.env.MONGO_URI);
});
