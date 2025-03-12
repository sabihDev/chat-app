import express from "express"
import { findNewUserByQuery, friendRequest, friendRequestResponse, getUserDetails, login, logout, register } from "../controllers/user.controllers.js";
import authentication from "../utils/authentication.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/details', authentication, getUserDetails);
router.post('/send/friend-request', authentication, friendRequest);
router.post('/request/status', authentication, friendRequestResponse);
router.post('/search/new', authentication, findNewUserByQuery);
router.post('/get/friends')

export {router as userRoutes}