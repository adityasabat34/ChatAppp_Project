import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUserLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUserLoading: true });
    try {
      const res = await axiosInstance.get("/message/users");
      set({ users: res.data.data });
    } catch (err) {
      console.error("Error in getUsers:", err?.response?.data || err.message);
      const errorMessage =
        err?.response?.data?.message || err?.response?.data || err.message;
      toast.error(errorMessage);
    } finally {
      set({ isUserLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${userId}`);
      // console.log(res);
      set({ messages: res.data.data });
    } catch (err) {
      console.error(
        "Error in getting messages:",
        err?.response?.data || err.message
      );
      const errorMessage =
        err?.response?.data?.message || err?.response?.data || err.message;
      toast.error(errorMessage);
    } finally {
      set({ isMessageLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { messages, selectedUser } = get();
    try {
      const res = await axiosInstance.post(
        `/message/send/${selectedUser._id}`,
        messageData
      );
      set({ messages: [...messages, res.data.data] });
    } catch (err) {
      console.error(
        "Error in sending messages:",
        err?.response?.data || err.message
      );
      const errorMessage =
        err?.response?.data?.message || err?.response?.data || err.message;
      toast.error(errorMessage);
    }
  },

  getNewMessageFromUser: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser =
        newMessage.senderId === selectedUser._id;

      if (!isMessageSentFromSelectedUser) return;

      set({ messages: [...get().messages, newMessage] }); //async way of doing ..get().messages, n
    });
  },

  stopGettingNewMessageFromUser: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),
}));
