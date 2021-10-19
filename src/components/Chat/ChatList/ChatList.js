import React from "react";

import { useChats } from "../../../contexts/ChatsContext";
import ChatPreview from "./ChatPreview";

export default function ChatList() {
  const { chats } = useChats();
  return (
    <ul>
      {chats.map((chat) => (
        <ChatPreview key={chat.id} chat={chat} />
      ))}
    </ul>
  );
}
