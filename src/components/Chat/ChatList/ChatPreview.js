import React from "react";

import { getTimeAgo } from "../../../utils";
import { useChats } from "../../../contexts/ChatsContext";
import { useUI } from "../../../contexts/UIContext";
import FilesService from "../../../services/FilesService";

export default function ChatPreview({ chat }) {
  const { selectedChat, setSelectedChat, loading } = useChats();
  const { responsive } = useUI();
  const { hideList } = responsive;

  const isSelected = selectedChat && chat.id === selectedChat.chat.id;

  const handleClick = () => {
    if (isSelected || loading) return;
    setSelectedChat({ chat });
    hideList();
  };
  
  const fileName = FilesService.formatName(chat.file);

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
        <div className="chat__message-text">
          {chat.message && chat.message.trim().length > 0 && (
            <p>{chat.message}</p>
          )}
          <p>{fileName}</p>
        </div>
        {chat.noChecked > 0 && (
          <div className="chat__message-time">{chat.noChecked}</div>
        )}
      </div>
    </li>
  );
}
