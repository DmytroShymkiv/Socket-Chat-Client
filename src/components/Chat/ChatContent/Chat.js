import React, { useEffect } from "react";

import ChatContent from "./ChatContent";
import ChatHeader from "./ChatHeader";
import { useChats } from "../../../contexts/ChatsContext";
import MessageInput from "../../MessageInput/MessageInput";
import { useSocket } from "../../../contexts/SocketContext/SocketContext";

export default function Chat() {
  const { selectedChat, setSelectedChat } = useChats();
  const { sendMessage } = useSocket();

  useEffect(() => {
    return () => {
      setSelectedChat(null);
    };

    // eslint-disable-next-line
  }, []);

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
