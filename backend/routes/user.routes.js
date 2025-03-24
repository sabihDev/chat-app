import express from "express";
import {
  checkAuth,
  findNewUserByQuery,
  friendRequest,
  friendRequestResponse,
  getLoggedInUserRequests,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controllers.js";
import authentication from "../utils/authentication.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/check/auth", authentication, checkAuth);
router.put("/update-profile", authentication, updateProfile);
router.post("/send/friend-request", authentication, friendRequest);
router.get("/get/friend-request", authentication, getLoggedInUserRequests);
router.post("/request/status", authentication, friendRequestResponse);
router.post("/search/new", authentication, findNewUserByQuery);
router.post("/get/friends");

export { router as userRoutes };
