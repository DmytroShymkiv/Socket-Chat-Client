import { useEffect, FC } from "react";

import ChatContent from "./ChatContent";
import ChatHeader from "./ChatHeader";
import { useChats } from "../../../contexts/ChatsContext";
import MessageInput from "../../MessageInput/MessageInput";
import { useSocket } from "../../../contexts/SocketContext/SocketContext";

const Chat: FC = () => {
  const { selectedChat, setSelectedChat } = useChats();
  const { sendMessage } = useSocket();

  useEffect(() => {
    return () => {
      setSelectedChat(undefined);
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
};

export default Chat;
