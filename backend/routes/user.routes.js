import express from "express"
import { friendRequest, friendRequestResponse, login, logout, register } from "../controllers/user.controllers.js";
import authentication from "../utils/authentication.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/send/friend-request', authentication, friendRequest)
router.post('/request/status', authentication, friendRequestResponse)

export {router as userRoutes}