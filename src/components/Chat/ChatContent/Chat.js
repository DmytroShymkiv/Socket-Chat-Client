import React, { useEffect } from "react";

import ChatContent from "./ChatContent";
import ChatHeader from "./ChatHeader";
import { useChats } from "../../../contexts/ChatsContext";
import MessageInput from "../../MessageInput/MessageInput";
import useSocket from "../../../hooks/useSocket/useSocket";
import MessageActionsProvider from "../../../contexts/MessageActionContext";

export default function Chat() {
  const { selectedChat, setSelectedChat } = useChats();
  const { sendMessage } = useSocket();

  useEffect(() => {
    return () => {
      setSelectedChat(null);
    };
  }, {});

  return (
    <div style={{ height: "100%" }}>
      {selectedChat ? (
        <MessageActionsProvider>
          <ChatHeader />
          <ChatContent />
          <MessageInput sendMessage={sendMessage} />
        </MessageActionsProvider>
      ) : (
        <div className="empty-chat">Select chat to start messaging</div>
      )}
    </div>
  );
}
