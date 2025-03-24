import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axiosInstance";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
    messages: [],
    friends: [],
    selectedUser: null,
    isFriendsLoading: false,
    isMessageLoading: false,

    getUsers: async () => {
        set({ isFriendsLoading: true });
        try {
            const res = await axiosInstance.get("/message/users");
            set({ friends: res.data });
        } catch (error) {
            console.error("Error fetching users:", error);
            toast.error(error.response?.data?.message || "Failed to fetch users.");
        } finally {
            set({ isFriendsLoading: false });
        }
    },

    getMessages: async (userID) => {
        if (!userID) return;

        set({ isMessageLoading: true });
        try {
            const res = await axiosInstance.get(`/message/${userID}`);
            set({ messages: res.data });
        } catch (error) {
            console.error("Error fetching messages:", error?.response?.data?.message);
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
            const res = await axiosInstance.post(
                `/message/send/${selectedUser._id}`,
                messageData
            );

            set({
                messages: Array.isArray(messages) ? [...messages, res.data] : [res.data],
            });
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

            set((state) => ({
                messages: Array.isArray(state.messages) ? [...state.messages, newMessage] : [newMessage],
            }));
        };

        socket.on("newMessage", handleNewMessage);
        set({ unsubscribeHandler: () => socket.off("newMessage", handleNewMessage) });
    },

    unsubscribeFromMessages: () => {
        const unsubscribeHandler = get().unsubscribeHandler;
        if (unsubscribeHandler) unsubscribeHandler();
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
