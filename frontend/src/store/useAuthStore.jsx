import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:4000";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/user/check/auth");
      set({ authUser: res.data });
      console.log(res.data);
      get().connectSocket();
    } catch (error) {
      console.error("Error in checking auth:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/user/register", data);
      localStorage.setItem("jwt", res.data.token);
      set({ authUser: res.data });
      toast.success("Account Created Successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/user/login", data);
      localStorage.setItem("jwt", res.data.token);
      set({ authUser: res.data });
      toast.success("You have logged in successfully");
      get().connectSocket();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/user/logout");
      set({ authUser: null });
      toast.success("You logged out successfully");
      localStorage.removeItem("jwt");
      get().disconnectSocket();
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed.");
    }
  },

  updateProfile: async (data) => {
    set({ isUpdatingProfile: true });

    try {
      const res = await axiosInstance.put("/user/update-profile", {
        profilePic: data,
      });
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
      console.log(res.data);
    } catch (error) {
      console.error("Error in updateProfile:", error);

      // Handle different types of errors gracefully
      const errorMessage =
        error.response?.data?.message || "Something went wrong. Please try again.";

      toast.error(errorMessage);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    console.log(authUser);
    
    const socket = io(BASE_URL, {
      query: {
        userId: authUser.data._id,
      },
    });

    console.log(authUser.data);
    
    socket.connect();

    set({ socket: socket });

    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },
  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },
}));
