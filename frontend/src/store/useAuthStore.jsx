import { create } from "zustand";
import axiosInstance from "../lib/axiosInstance";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIng: false,
  isUpdatingProfile: false,

  isCheckingAuth: true,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/user/check/auth");

      set({ authUser: res.data });
      console.log(res.data);
      
    } catch (error) {
      console.log("Error in checking auth: ", error);

      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async ()=>{
    try {
      
    } catch (error) {
      
    }
  },
}));
