import express from "express"
import { getFriendsForSidebar, getMessages, sendMessage } from "../controllers/message.controllers.js";
import authentication from "../utils/authentication.js";
import multer from 'multer';
const upload = multer({ dest: 'uploads/' });

const router = express.Router();

router.get('/users', authentication, getFriendsForSidebar);
router.post('/:id', authentication, getMessages);
router.post('/send/:id', authentication, sendMessage)

export {router as messageRoutes}