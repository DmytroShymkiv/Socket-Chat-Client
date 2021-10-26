import React from "react";

import { useChats } from "../../../contexts/ChatsContext";
import ChatListHeader from "./ChatListHeader";
import ChatPreview from "./ChatPreview";
import Search from "../../Search/Search";
export default function ChatList() {
  const { chats } = useChats();

  return (
    <>
      <ChatListHeader />
      <Search />
      <ul className="chat-list__list">
        {chats.map((chat) => (
          <ChatPreview key={chat.id} chat={chat} />
        ))}
      </ul>
    </>
  );
}
