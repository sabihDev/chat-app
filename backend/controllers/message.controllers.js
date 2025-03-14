import User from "../models/user.model.js";
import FriendRequest from "../models/friendRequest.model.js";
import bcrypt from "bcrypt";
import generateTokenAndSetCookie from "../utils/generateToken.js";
import Message from "../models/message.model.js";
import cloudinary from "../utils/cloudinary.js";

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
      $or: [
        { sender: myId, receiver: userToChatId },
        { sender: userToChatId, receiver: myId },
      ],
    });

    res.status(200).json({ messages });
  } catch (error) {
    console.log("Error in getting message ", error);
    req.status(500).json({ error: "Internal Server Error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const attachmentFiles = req.files || [];
    const { id: receiverId } = req.params;
    const senderId = req.user.userId;

    if (!message && attachmentFiles.length === 0) {
      return res.status(400).json({ error: "Message content or attachments are required" });
    }

    // Upload attachments to Cloudinary if any
    const uploadedAttachments = [];
    if (attachmentFiles.length > 0) {
      for (const file of attachmentFiles) {
        try {
          const result = await cloudinary.uploader.upload(file.path, {
            folder: "chat-attachments",
            resource_type: "auto", // Automatically detect file type
          });
          uploadedAttachments.push({
            url: result.secure_url,
            public_id: result.public_id,
            type: file.mimetype
          });
        } catch (uploadError) {
          console.log("Error uploading file to Cloudinary:", uploadError);
          return res.status(500).json({ error: "Error uploading attachments" });
        }
      }
    }

    const newMessage = new Message({
      sender: senderId,
      receiver: receiverId,
      message,
      attachments: uploadedAttachments
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sending message:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};