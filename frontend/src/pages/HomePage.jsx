import React from "react";
import NoChatContainer from "../components/NoChatContainer";
import ChatContainer from "../components/ChatContainer";
import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen w-screen flex bg-base-200 overflow-hidden pt-16">
      {/* Sidebar - fixed width, scrollable if needed */}
      <Sidebar />

      {/* Chat area - flexible */}
      <div className="flex-1 h-full overflow-hidden">
        {!selectedUser ? <NoChatContainer /> : <ChatContainer />}
      </div>
    </div>
  );
};

export default HomePage;
