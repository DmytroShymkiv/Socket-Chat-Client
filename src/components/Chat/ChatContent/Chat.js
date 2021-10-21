import React from "react";

import ChatContent from "./ChatContent";
import ChatHeader from "./ChatHeader";
import { useChats } from "../../../contexts/ChatsContext";
import MessageInput from "../../MessageInput/MessageInput";
import useSocket from "../../../hooks/useSocket/useSocket";

export default function Chat() {
  const { selectedChat } = useChats();
  const { sendMessage } = useSocket();

  return (
    <div style={{ height: "100%" }}>
      {selectedChat ? (
        <>
          <ChatHeader />
          <ChatContent />
          <MessageInput sendMessage={sendMessage} />
        </>
      ) : (
        <div className="empty-chat">Select chat to start messaging</div>
      )}
    </div>
  );
}
