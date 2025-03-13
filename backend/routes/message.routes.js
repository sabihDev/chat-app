import express from "express"
import { getFriendsForSidebar } from "../controllers/message.controllers.js";
import authentication from "../utils/authentication.js";

const router = express.Router();

router.get('/users', authentication, getFriendsForSidebar);
router.get('/:id', authentication, getFriendsForSidebar);

export {router as messageRoutes}