import React from "react";

import { useChats } from "../../../contexts/ChatsContext";
import MessageFromUser from "../../Message/MessageFromUser";
import MessageToUser from "../../Message/MessageToUser";
import MessageInput from "../../MessageInput/MessageInput";

export default function ChatContent() {
  const { selectedChat } = useChats();
  const messages = selectedChat.messages;

  const messagesView = messages.map((message) =>
    message.type === "user" ? (
      <MessageFromUser key={message.id} message={message} />
    ) : (
      <MessageToUser key={message.id} message={message} />
    )
  );

  return (
    <div className="chatroom__content">
      {messagesView}
      <MessageInput />
    </div>
  );
}
