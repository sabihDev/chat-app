import User from "../models/user.model.js";
import FriendRequest from "../models/friendRequest.model.js";
import bcrypt from "bcrypt"
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const register = async (req, res) => {
    try {
        const { fullName, email, username, password, confirmPassword, gender } = req.body;

        if (!fullName || !email || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords don't match" });
        }

        const user = await User.findOne({ username });

        if (user) {
            return res.status(400).json({ error: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            email,
            password: hashedPassword,
            gender,
            profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        });

        await newUser.save();

        generateTokenAndSetCookie(newUser._id, res);

        res.status(200).json({
            _id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic
        });

    } catch (error) {
        console.log("Error in register controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
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

        generateTokenAndSetCookie(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            username: user.username,
            profilePic: user.profilePic
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
            return res.status(400).json({ error: "You cannot send a friend request to yourself." });
        }

        const recipient = await User.findById(userId);
        const sender = await User.findById(senderId);

        if (!recipient || !sender) {
            return res.status(404).json({ error: "User not found." });
        }

        if (sender.friends.includes(userId)) {
            return res.status(400).json({ error: "You are already friends with this user." });
        }

        if (recipient.friendRequests.includes(senderId)) {
            return res.status(400).json({ error: "Friend request already sent." });
        }

        // Check if a friend request already exists
        const existingRequest = await FriendRequest.findOne({ sender: senderId, recipient: userId });

        if (existingRequest) {
            return res.status(400).json({ error: "Friend request already exists." });
        }

        // Send friend request
        recipient.friendRequests.push(senderId);
        await recipient.save();

        const newFriendRequest = new FriendRequest({ sender: senderId, recipient: userId });
        await newFriendRequest.save();

        return res.status(200).json({ message: "Friend request sent successfully." });

    } catch (error) {
        console.log("Error in friendRequest controller: ", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};