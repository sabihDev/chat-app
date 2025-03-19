import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,

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
      toast.error(error.res?.data?.message || "Signup failed. Please try again.");
    } finally {
      set({ isSigningUp: false });
    }
  },
}));
