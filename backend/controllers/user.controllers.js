import User from "../models/user.model.js";
import FriendRequest from "../models/friendRequest.model.js";
import bcrypt from "bcrypt"
import generateTokenAndSetCookie from "../utils/generateToken.js";
import cloudinary from "../utils/cloudinary.js"
import { io } from "../utils/socket.js";

export const register = async (req, res) => {
    try {
        const { fullName, email, username, password, confirmPassword, gender } = req.body;

        if (!fullName || !email || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords don't match" });
        }

        // Check if username already exists
        const existingUsername = await User.findOne({ username });
        if (existingUsername) {
            return res.status(400).json({ message: "Username already exists" });
        }

        // Check if email already exists
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Generate profile picture based on gender
        const profilePic = `https://api.dicebear.com/7.x/adventurer/svg?seed=${gender === 'male' ? "boy" : "girl"}?username=${username}`;

        // Create a new user
        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
            gender: gender == "male" ? "male" : gender == "female" ? "female" : "other",
            profilePic,
        });

        // Save new user with duplicate key error handling
        try {
            await newUser.save();
        } catch (error) {
            if (error.code === 11000) {
                return res.status(400).json({ message: "Email or Username already exists" });
            }
            throw error;
        }

        // Generate JWT token and set cookie
        const token = generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
            token,
        });

    } catch (error) {
        console.error("Error in register controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: "Invalid credentials" });
        }

        const token = generateTokenAndSetCookie(user._id, res);

        return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic,
            token
        });

    } catch (error) {
        console.log("Error in login controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const logout = async (req, res) => {
    try {
        res.cookie("jwt", "", { maxAge: 0 });
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        console.log("Error in logout controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

export const friendRequest = async (req, res) => {
    try {
        const { userId } = req.query;
        const senderId = req.user.userId;

        if (userId === senderId) {
            return res.status(400).json({ error: true, message: "You cannot send a friend request to yourself." });
        }

        const recipient = await User.findById(userId);
        const sender = await User.findById(senderId);

        if (!recipient || !sender) {
            return res.status(404).json({ error: true, message: "User not found." });
        }

        if (sender.friends.includes(userId)) {
            return res.status(400).json({ error: true, message: "You are already friends with this user." });
        }

        if (recipient.friendRequests.includes(senderId)) {
            return res.status(400).json({ error: true, message: "Friend request already sent." });
        }

        const existingRequest = await FriendRequest.findOne({ sender: senderId, recipient: userId });

        if (existingRequest) {
            return res.status(400).json({ error: true, message: "Friend request already exists." });
        }

        // Add sender ID to recipient's friendRequests array
        await recipient.updateOne({ $push: { friendRequests: senderId } });

        // Create a new friend request document
        const newFriendRequest = new FriendRequest({ sender: senderId, recipient: userId });
        await newFriendRequest.save();

        // Fetch the populated friend request for real-time update
        const populatedRequest = await FriendRequest.findById(newFriendRequest._id)
            .populate("sender", "username fullName profilePic");

        // Emit real-time update to the recipient
        io.to(recipient._id.toString()).emit("newFriendRequest", populatedRequest);

        return res.status(200).json({ error: false, message: "Friend request sent successfully.", newFriendRequest });

    } catch (error) {
        console.error("Error in friendRequest controller:", error.message);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};

export const friendRequestResponse = async (req, res) => {
    try {
        const RequestReceiver = req.user.userId; // The one responding to the request
        const RequestSender = req.query.userId; // The one who sent the original request
        const RequestResponse = req.body.response; // "accepted" or "rejected"

        console.log("Friend Request Response:", RequestResponse);

        // Fetch users
        const RequestReceiverUser = await User.findById(RequestReceiver);
        const RequestSenderUser = await User.findById(RequestSender);

        if (!RequestReceiverUser || !RequestSenderUser) {
            return res.status(400).json({ error: true, message: "User does not exist" });
        }

        // Check if friend request exists
        const friendRequest = await FriendRequest.findOne({
            sender: RequestSender,
            recipient: RequestReceiver, // Sender sent request to receiver
        });

        if (!friendRequest) {
            return res.status(400).json({ error: true, message: "This request does not exist" });
        }

        if (RequestResponse === "rejected") {
            // Remove friend request from receiver
            await RequestReceiverUser.updateOne({ $pull: { friendRequests: RequestSender } });

            // Delete friend request document
            await FriendRequest.deleteOne({ sender: RequestSender, recipient: RequestReceiver });

            // Emit real-time update for request rejection
            io.to(RequestSender).emit("friendRequestResponse", {
                status: "rejected",
                user: RequestReceiverUser.username,
            });

            return res.status(200).json({ error: false, message: "Request rejected" });
        }

        // Accepting friend request
        await RequestReceiverUser.updateOne({
            $pull: { friendRequests: RequestSender },
            $push: { friends: RequestSender },
        });

        await RequestSenderUser.updateOne({
            $push: { friends: RequestReceiver },
        });

        // Delete the friend request document
        await FriendRequest.deleteOne({ sender: RequestSender, recipient: RequestReceiver });

        // Emit real-time update for request acceptance
        io.to(RequestSender).emit("friendRequestResponse", {
            status: "accepted",
            user: RequestReceiverUser.username,
        });

        io.to(RequestReceiver).emit("friendRequestResponse", {
            status: "accepted",
            user: RequestSenderUser.username,
        });

        // Remove password before sending response
        const sanitizedUser = RequestReceiverUser.toObject();
        delete sanitizedUser.password;

        return res.status(200).json({ error: false, message: "Request accepted", user: sanitizedUser });

    } catch (error) {
        console.error("Error in friendRequestResponse:", error.message);
        return res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};

export const findNewUserByQuery = async (req, res) => {
    try {
        const { query } = req.query;
        const myId = req.user.userId;

        if (!query) {
            return res.status(400).json({ error: "Search query is required" });
        }

        const users = await User.find({
            $and: [
                {
                    $or: [
                        { username: { $regex: query, $options: "i" } },
                        { fullName: { $regex: query, $options: "i" } }
                    ]
                },
                { _id: { $ne: myId } }
            ]
        }).select("username fullName profilePic");

        res.status(200).json(users);

    } catch (error) {
        console.log("Error in findNewUserByQuery controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export const checkAuth = async (req, res) => {
    try {
        // Ensure user is authenticated
        if (!req.user || !req.user.userId) {
            return res.status(401).json({ error: "Unauthorized: No user data found in token" });
        }

        const userId = req.user.userId; // Get userId from JWT token

        const user = await User.findById(userId)
            .select("-password") // Exclude password
            .populate("friends", "username fullName profilePic"); // Populate friends array

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // ✅ Ensure response contains `data`
        res.status(200).json({ data: user });

    } catch (error) {
        console.error("Error in getUserDetails controller:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};


export const updateProfile = async (req, res) => {
  try {

    const { profilePic } = req.body;
    const userId = req.user?.userId;
    console.log(userId);
    

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized access" });
    }

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true, runValidators: true }
    ).select("-password");

    await updatedUser.save();
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log(updatedUser);
    
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getLoggedInUserRequests = async (req, res) => {
    try {
        const userId = req.user?.userId;

        if (!userId) {
            return res.status(401).json({ error: true, message: "Unauthorized access" });
        }

        // Find friend requests where the logged-in user is the recipient
        const requests = await FriendRequest.find({ recipient: userId, status: "pending" })
            .populate("sender", "username fullName profilePic");

        // Emit real-time update to the specific user if io exists
        if (typeof io !== "undefined") {
            io.to(userId.toString()).emit("friendRequests", requests);
        }

        if(!requests) return res.status(200).json({error:false,message:"You have no friend requests right now."})

        res.status(200).json({ error: false, requests });

    } catch (error) {
        console.error("Error in getLoggedInUserRequests:", error.message);
        res.status(500).json({ error: true, message: "Internal Server Error" });
    }
};
