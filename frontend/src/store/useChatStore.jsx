import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axiosInstance";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    friends: [],
    friendRequests: [],
    selectedUser: null,
    isFriendsLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
        set({ isFriendsLoading: true });
        try {
            const res = await axiosInstance.get("/message/users");
            set({ friends: res.data });
            console.log(res.data);
            
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error(error.response?.data?.message || "Failed to fetch users.");
        } finally {
            set({ isFriendsLoading: false });
        }
    },

    searchUsers: async (query) => {
        if (!query) return;
        try {
            const res = await axiosInstance.post(`/user/search/new?query=${query}`);
            return res.data; 
        } catch (error) {
            console.error("Error searching users:", error);
            toast.error(error.response.data.message || "Failed to search users.");
        }
    },

    getFriendRequests: async () => {
        try {
            const res = await axiosInstance.get("/user/get/friend-request");
            set({ friendRequests: res.data.requests });
            console.log(res.data.requests);
            
        } catch (error) {
            console.log(error);
            set({friendRequest:[]});
            
        }
    },

    sendFriendRequest: async (userID) => {
        try {
            await axiosInstance.post(`/user/send/friend-request?userId=${userID}`);
            toast.success("Friend request sent!");
            const socket = useAuthStore.getState().socket;
            if (socket) socket.emit("friendRequestSent", { to: userID });
        } catch (error) {
            console.error("Error sending friend request:", error);
            toast.error(error.response?.data?.message || "Failed to send friend request.");
        }
    },

    respondToFriendRequest: async (requestID, response) => {
        const {friends, friendRequests} = get();
        try {
            console.log(requestID);
            
            const res = await axiosInstance.post(`/user/request/status?userId=${requestID}`, { response });
            if (response === "accepted") {
                set({
                    friends: Array.isArray(friends) ? [...friends, res.data.user] : [res.data.user],
                    friendRequests: friendRequests.filter(req => req.sender._id !== requestID),
                });
                toast.success("Friend request accepted!");
            } else {
                set({
                    friendRequests: friendRequests.filter(req => req.sender._id !== requestID),
                });
                toast.success("Friend request declined.");
            }
        } catch (error) {
            console.error("Error responding to friend request:", error);
            toast.error(error.response?.data?.message || "Failed to process friend request.");
        }
    },

    getMessages: async (userID) => {
        if (!userID) return;
        set({ isMessageLoading: true });
        try {
            const res = await axiosInstance.get(`/message/${userID}`);
            set({ messages: res.data });
        } catch (error) {
            console.error("Error fetching messages:", error);
            toast.error(error?.response?.data?.message || "Failed to fetch messages.");
        } finally {
            set({ isMessageLoading: false });
        }
    },

    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        if (!selectedUser?._id) {
            toast.error("No user selected.");
            return;
        }
        try {
            const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
            set({ messages: [...messages, res.data] });
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error(error.response?.data?.message || "Failed to send message.");
        }
    },

    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
        const socket = useAuthStore.getState().socket;
        if (!socket) return;

        const handleNewMessage = (newMessage) => {
            if (newMessage.sender !== selectedUser._id) return;
            set((state) => ({ messages: [...state.messages, newMessage] }));
        };

        socket.on("newMessage", handleNewMessage);
        socket.on("friendRequestReceived", get().getFriendRequests);
        socket.on("friendRequestAccepted", get().getUsers);

        set({ unsubscribeHandler: () => {
            socket.off("newMessage", handleNewMessage);
            socket.off("friendRequestReceived", get().getFriendRequests);
            socket.off("friendRequestAccepted", get().getUsers);
        }});
    },

    unsubscribeFromMessages: () => {
        const unsubscribeHandler = get().unsubscribeHandler;
        if (unsubscribeHandler) unsubscribeHandler();
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));