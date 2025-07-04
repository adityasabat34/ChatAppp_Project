import React from "react";
import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageLoadingScreen from "./skeletons/MessageLoadingScreen";
import { useAuthStore } from "../store/useAuthStore";
import { LocalTimeForMessage } from "../lib/LocalTime";
import { useRef } from "react";

const ChatContainer = () => {
  const {
    messages,
    isMessageLoading,
    getMessages,
    selectedUser,
    getNewMessageFromUser,
    stopGettingNewMessageFromUser,
  } = useChatStore();

  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    getNewMessageFromUser();

    return () => {
      stopGettingNewMessageFromUser();
    };
  }, [
    getMessages,
    selectedUser._id,
    getNewMessageFromUser,
    stopGettingNewMessageFromUser,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessageLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto h-full">
        <ChatHeader />
        <MessageLoadingScreen />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto h-full">
      <ChatHeader />
      {/* <MessageLoadingScreen /> */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${
              message.senderId === authUser._id ? "chat-end" : "chat-start"
            }`}
            ref={messageEndRef}
          >
            <div className="chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : selectedUser.profilePic || "/avatar.png"
                  }
                  alt="Profile Pic"
                />
              </div>
            </div>

            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {LocalTimeForMessage(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Sent Image"
                  className="max-w-xs max-h-xs mb-2"
                />
              )}

              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
