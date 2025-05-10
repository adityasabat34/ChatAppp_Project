import React from "react";
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageLoadingScreen from "./skeletons/MessageLoadingScreen";

const ChatContainer = () => {
  const { messages, isMessageLoading, getMessages, selectedUser } =
    useChatStore();

  useEffect(() => {
    getMessages(selectedUser._id);
  }, [getMessages, selectedUser._id]);

  if (true) {
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <MessageLoadingScreen />
      <MessageInput />
    </div>;
  }
  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <MessageLoadingScreen />
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
