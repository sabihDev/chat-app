import express from "express"
import { getFriendsForSidebar } from "../controllers/user.controllers.js";
import authentication from "../utils/authentication.js";

const router = express.Router();

router.post('/users', authentication, getFriendsForSidebar);
export {router as messageRoutes}