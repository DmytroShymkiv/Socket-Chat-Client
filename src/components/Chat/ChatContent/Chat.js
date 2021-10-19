import React from "react";

import ChatContent from "./ChatContent";
import ChatHeader from "./ChatHeader";
import { useChats } from "../../../contexts/ChatsContext";

export default function Chat() {
  const { selectedChat } = useChats();
  return (
    <div style={{ height: "100%" }}>
      {selectedChat ? (
        <>
          <ChatHeader />
          <ChatContent />
        </>
      ) : (
        <div className="empty-chat">Select chat to start messaging</div>
      )}
    </div>
  );
}
