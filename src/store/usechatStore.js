import { create } from "zustand";
import { axiosInstance } from "../lib/utils.js";
import { useAuthStore } from "./authstore.js";
import { toast } from "react-hot-toast";
import { showNewMessageToast} from "../lib/toast/toast.jsx";
let typingTimeout;

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isLoadingMessages: false,
  isUserLoading: false,
  typingUserId: null,
  error: null,

 
  getUsers: async () => {
    try {
      set({ isUserLoading: true });
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data.data, isUserLoading: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to fetch users", isUserLoading: false });
    }
  },

  // Fetch messages
  getMessages: async (userId) => {
    try {
      set({ isLoadingMessages: true });
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data.data, isLoadingMessages: false });
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to fetch messages", isLoadingMessages: false });
    }
  },

  // Send message
  sendMessage: async (text) => {
    const { messages, selectedUser } = get();
    if (!selectedUser) return;

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, { text });
      set({ messages: [...messages, res.data.data] });
      toast.success("Message sent!");
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to send message" });
      toast.error(error.response?.data?.message || "Failed to send message");
    }
  },

  
  emitTyping: () => {
    const { selectedUser } = get();
    const { socket, authUser } = useAuthStore.getState();
    if (!socket || !selectedUser) return;

    // Send typing
    socket.emit("typing", { to: selectedUser._id, senderId: authUser._id });

    // Stop typing after 1.5s idle
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => {
      socket.emit("stopTyping", { to: selectedUser._id, senderId: authUser._id });
    }, 300);
  },

  // Subscribe to socket events
  subscribeToSocketEvents: () => {
    const { socket } = useAuthStore.getState();
    if (!socket) return;

    socket.off("newmessage");
    socket.off("typing");
    socket.off("stopTyping");

    socket.on("newmessage", (data) => {
      console.log("Received new message via socket:", data);
        //  const { messageToast } = useToastStore().get
      const { message, senderdata} = data;
      const { selectedUser } = get();

      if (selectedUser && senderdata._id === selectedUser._id) {
        set((state) => ({ messages: [...state.messages, message] }));
      } else {
     
       console.log("New message from", senderdata.fullname ,message.text);
         showNewMessageToast({
          senderName: senderdata.fullname,
          
          message: message.text,
         })
      } 
    });

    socket.on("typing", ({ senderId }) => {
      set({ typingUserId: senderId });
    });

    socket.on("stopTyping", ({ senderId }) => {
      set({ typingUserId: null });
    });
  },

  unsubscribeFromSocketEvents: () => {
    const { socket } = useAuthStore.getState();
    if (!socket) return;

    socket.off("newmessage");
    socket.off("typing");
    socket.off("stopTyping");
  },

  setSelectedUser: (user) => set({ selectedUser: user }),
}));
