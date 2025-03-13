import User from "../models/user.model.js";
import FriendRequest from "../models/friendRequest.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import Message from "../models/message.model.js";

export const getFriendsForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user.userId;

    const user = await User.findById(loggedInUserId).populate({
      path: "friends",
      select: "fullName username profilePic",
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ friends: user.friends });
  } catch (error) {
    console.error("Error in getFriendsForSidebar controller:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user.userId;

    const messages = await Message.find({
      $or:[
        {sender:myId, receiver:userToChatId},
        {sender:userToChatId, receiver:myId},
      ]
    });

    res.status(200).json({messages});
  } catch (error) {
    console.log("Error in getting message ", error);
    req.status(500).json({error:"Internal Server Error"})
    
  };
};
