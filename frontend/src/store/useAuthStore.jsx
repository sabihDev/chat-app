import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/user/check/auth");
      set({ authUser: res.data });
      console.log(res.data);
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
    } catch (error) {
      toast.error(
        error.res?.data?.message || "Signup failed. Please try again."
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
      toast.success("You logged in successfully");
    } catch (error) {
      toast.error(
        error.res?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      set({ isSigningUp: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/user/logout");
      set({ authUser: null });
      toast.success("You logged out successfully");
      localStorage.clear("jwt");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

 updateProfile: async (data) => {
  set({ isUpdatingProfile: true });

  try {
    const res = await axiosInstance.put("/user/update-profile", {profilePic: data});
    set({ authUser: res });
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


}));
