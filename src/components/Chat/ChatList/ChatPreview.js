import React from "react";

import { getTimeAgo } from "../../../utils";
import { useChats } from "../../../contexts/ChatsContext";
import { useHide } from "../../../contexts/HideContext";

export default function ChatPreview({ chat }) {
  const { selectedChat, setSelectedChat, loading } = useChats();
  const { hideList } = useHide();

  const isSelected = selectedChat && chat.id === selectedChat.chat.id;

  const handleClick = () => {
    if (isSelected || loading) return;
    setSelectedChat({ chat });
    hideList();
  };

  return (
    <li
      onClick={handleClick}
      className={`chat${isSelected ? " chat-selected" : ""}`}
    >
      <div className="chat__header">
        <img className="chat__header-photo" src={chat.photo} alt="chat" />
        <div className="chat__header-title">
          <div className="chat__header-name">
            <div className="chat__header-roomname">{chat.name}</div>
            <div>{chat.online ? "online" : "offline"}</div>
          </div>
          <div className="chat__header-time">
            {chat.message && getTimeAgo(chat.time)}
          </div>
        </div>
      </div>
      <div className="chat__message">
        <p className="chat__message-text">{chat.message}</p>
        {chat.noChecked > 0 && (
          <div className="chat__message-time">{chat.noChecked}</div>
        )}
      </div>
    </li>
  );
}
