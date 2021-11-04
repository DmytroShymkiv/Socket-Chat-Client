import { FC } from "react";

import { useChats } from "../../../contexts/ChatsContext";
import ChatListHeader from "./ChatListHeader";
import ChatPreview from "./ChatPreview";
import Search from "../../Search/Search";

const ChatList: FC = () => {
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
};

export default ChatList;
