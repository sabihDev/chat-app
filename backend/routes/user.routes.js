import express from "express";
import {
  checkAuth,
  findNewUserByQuery,
  friendRequest,
  friendRequestResponse,
  login,
  logout,
  register,
} from "../controllers/user.controllers.js";
import authentication from "../utils/authentication.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/check/auth", authentication, checkAuth);
router.post("/send/friend-request", authentication, friendRequest);
router.post("/request/status", authentication, friendRequestResponse);
router.post("/search/new", authentication, findNewUserByQuery);
router.post("/get/friends");

export { router as userRoutes };
