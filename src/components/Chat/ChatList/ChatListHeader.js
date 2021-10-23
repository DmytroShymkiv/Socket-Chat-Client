import React from "react";

import more from "../../../assets/icons/chevron-down.png";
import plus from "../../../assets/icons/plus.png";

export default function ChatListHeader() {
  return (
    <div className="chat-list__header">
      <div>
        <h1 className="chat-list__header-title">Chats</h1>
        <div className="chat-list__header-filter">
          <p>Recent chats</p>
          <div>
            <img src={more} alt="more" />
          </div>
        </div>
      </div>
      <button className="chat-list__header-create">
        <img src={plus} alt="plus" />
        <p>Create New Chat</p>
      </button>
    </div>
  );
}
