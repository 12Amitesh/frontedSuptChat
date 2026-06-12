import { create } from "zustand";
import { axiosInstance } from "../lib/utils.js";
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isChecking: false,
  isLoading: false,
  error: null,
  socket: null,
  onlineUsers: [],
 
  checkAuth: async () => {
    try {
      set({ isChecking: true });
      const res = await axiosInstance.get("/api/auth/check");

      set({ authUser: res.data.data });
      console.log("online users after checkAuth:", get().authUser._id);
      get().socketConnect();
    } catch (error) {
      set({ authUser: null });
    } finally {
      set({ isChecking: false });
    }
  },

  
  register: async (userData) => {
    try {
      set({ isLoading: true, error: null });
      const res = await axiosInstance.post("/api/auth/register", userData);

      set({ authUser: res.data.data, isLoading: false });
      return { success: true };
    } catch (error) {
      set({
        error: error.response?.data?.message || "Registration failed",
        isLoading: false
      });
      return { success: false };
    }
  },

  // 🔐 LOGIN
  login: async (credentials) => {
    try {
      set({ isLoading: true, error: null });
      const res = await axiosInstance.post("/api/auth/login", credentials);

      set({ authUser: res.data.data.user, isLoading: false });

      // 🔌 auto connect socket after login
      get().socketConnect();

      return { success: true };
    } catch (error) {
      set({
        error: error.response?.data?.message || "Login failed",
        isLoading: false
      });
      return { success: false };
    }
  },

  // 🚪 LOGOUT
  logout: async () => {
    await axiosInstance.post("/api/auth/logout");
    get().socketDisconnect();
    set({ authUser: null });
  },

  // 👤 UPDATE PROFILE
  updateProfile: async (data) => {
    try {
      set({ isLoading: true, error: null });
      const res = await axiosInstance.put("/user/updateProfile", data);

      set({ authUser: res.data.data, isLoading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update profile",
        isLoading: false
      });
    }
  },

  // 🔌 SOCKET CONNECT
  socketConnect: () => {
    const { authUser, socket } = get();
    if (!authUser || socket) return;

    const newSocket = io(SOCKET_URL, {
      auth: {
        userId: authUser._id,
        token: authUser.token
      },
      autoConnect: false
    });

    newSocket.connect();
    set({ socket: newSocket });

    newSocket.on("onlineusers", (usedIds) => {
     
      console.log("Online Users from socketConnect:", usedIds);
      set({ onlineUsers: usedIds });
    });
  },

  // 🔌 SOCKET DISCONNECT
  socketDisconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null });
    }
  }
}));
