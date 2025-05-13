import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { create } from "zustand";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5000";

const useAuthStore = create((set, get) => ({
  authUser: null, // initial state for user authenticated or not if yes then data will be stored
  isSigningUp: false, // Loading state for signing up
  isLoggingIn: false, // Loading state for logging in
  isUpdatingProfile: false, // Loading state for updating profile
  onlineUsers: [],
  isCheckingAuth: true, //Loading state for authenticated user
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data.data });
    } catch (err) {
      console.error("Error in checkAuth:", err?.response?.data || err.message);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    // data includes fullName, email, password
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data.data });
      toast.success("Account created successfully");
      get().connectSocket();
    } catch (err) {
      console.error("Error in signup:", err?.response?.data || err.message);
      toast.error(err?.response?.data || err.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    console.log(data);
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data.data });
      toast.success("Logged In Successfully");
      get().connectSocket();
    } catch (err) {
      console.error(
        "error occured in login process",
        err?.response?.data || err.message
      );
      const errorMessage =
        err?.response?.data?.message || err?.response?.data || err.message;
      toast.error(errorMessage);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (err) {
      console.error("Error in logout:", err?.response?.data || err.message);
      toast.error(err?.response?.data || err.message);
    }
  },

  updateProfilePicture: async (picData) => {
    set({ isUpdatingProfile: true });
    try {
      const res = await axiosInstance.put("/auth/update-profile", picData);
      set({ authUser: res.datadata });
      toast.success("Profile picture updated successfully");
    } catch (err) {
      console.error(
        "Error in updateProfilePicture:",
        err?.response?.data || err.message
      );
      const errorMessage =
        err?.response?.data?.message || err?.response?.data || err.message;
      toast.error(errorMessage);
    } finally {
      set({ isUpdatingProfile: false });
    }
  },

  connectSocket: () => {
    const { authUser } = get();
    if (!authUser || get().socket?.connect) return;

    const socket = io(BASE_URL);
    socket.connect();

    set({ socket: socket });
    console.log("YES CONNECTED");
  },

  disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
    console.log("YES DISCONNECCTED");
  },
}));

export { useAuthStore };
