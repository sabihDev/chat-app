import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axiosInstance";

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
        set({ isMessageLoading: true });
        try {
            const res = await axiosInstance.post(`/message/${userID}`);
            set({ messages: res.data });
            console.log("messages store:", res.data);
        } catch (error) {
            console.error("Error fetching messages:", error);
            toast.error(error.response?.data?.message || "Failed to fetch messages.");
        } finally {
            set({ isMessageLoading: false });
        }
    },

    sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/message/send/${selectedUser._id}`, messageData);
      console.log(res);
      
      set({ messages: Array.isArray(messages) ? [...messages, res.data] : [res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },



    setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
