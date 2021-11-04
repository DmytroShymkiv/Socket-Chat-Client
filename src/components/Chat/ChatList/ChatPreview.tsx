import { FC } from "react";

import { getTimeAgo } from "../../../utils";
import { useChats } from "../../../contexts/ChatsContext";
import { useUI } from "../../../contexts/UIContext";
import { useSocket } from "../../../contexts/SocketContext/SocketContext";
import FilesService from "../../../services/FilesService";
import { getChatStatus } from "../../../utils";
import { IChat } from "../../../types/chat.types";

const ChatPreview: FC<{ chat: IChat }> = ({ chat }) => {
  const { selectedChat, setSelectedChat, loading } = useChats();
  const { readMessages } = useSocket();
  const { responsive } = useUI();
  const { hideList } = responsive;

  const isSelected = selectedChat && chat.id === selectedChat.chat.id;

  const handleClick = () => {
    if (isSelected || loading) return;
    setSelectedChat({ chat });
    readMessages(chat.id);
    hideList();
  };

  const fileName = chat.file && FilesService.formatName(chat.file);

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
            <div style={{ color: chat.online ? "#2a8bf2" : "#707c97" }}>
              {getChatStatus(chat)}
            </div>
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
        {!isSelected && chat.noChecked > 0 && (
          <div className="chat__message-unchecked">
            {chat.noChecked}
            {loading}
          </div>
        )}
      </div>
    </li>
  );
};

export default ChatPreview;
