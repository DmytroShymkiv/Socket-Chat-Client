import { FC } from "react";

import { useChats } from "../../../contexts/ChatsContext";
import { useUI } from "../../../contexts/UIContext";
import attach from "../../../assets/icons/attach-2.png";
import more from "../../../assets/icons/more-vertical.png";
import { getChatStatus } from "../../../utils";

const ChatHeader: FC = () => {
  const { responsive } = useUI();
  const { isSomeHidden, hideChat } = responsive;
  const { selectedChat } = useChats();
  const chat = selectedChat && selectedChat.chat;

  return (
    <>
      {chat && (
        <div className="chatroom__header">
          <div className="chatroom__header-about">
            {isSomeHidden && <div onClick={hideChat}>Back</div>}
            <img src={chat.photo} alt="group" />
            <div className="chatroom__header-info">
              <p className="chatroom__header-name">{chat.name}</p>
              <p style={{ color: chat.online ? "#2a8bf2" : "#707c97" }}>
                {getChatStatus(chat)}
              </p>
            </div>
          </div>
          <div className="chatroom__header-buttons">
            <button>
              <img src={attach} alt="attach" />
            </button>
            <button>
              <img src={more} alt="more" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatHeader;
