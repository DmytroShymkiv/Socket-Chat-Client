import React from "react";

import more from "../../assets/icons/more-horizontal.png";
import send from "../../assets/icons/checkmark.png";
import read from "../../assets/icons/all-done.png";
import MessageFile from "./MessageFile";
import MessageAction from "../MessageActions/MessageAction";
import { useUI } from "../../contexts/UIContext";

export default function MessageFromUser({ message }) {
  const { messages } = useUI();
  const { showActionID, setShowActionID, cancelEdit } = messages;
  const isActionShowed = showActionID === message.id;

  const getMessageStatus = () => {
    switch (message.status) {
      case "read":
        return <img src={read} alt="read" />;
      case "send":
        return <img src={send} alt="send" />;
      default:
        return <div>...</div>;
    }
  };

  const handleClick = () => {
    setShowActionID(!isActionShowed && message.id);
    isActionShowed && cancelEdit();
  };

  return (
    <div className="message message-from">
      {isActionShowed && <MessageAction id={message.id} text={message.text} />}
      <button onClick={handleClick}>
        <img src={more} alt="more" />
      </button>
      <div className="message-from__content">
        {message.text}
        <MessageFile file={message.file} />
      </div>
      <div>{getMessageStatus()}</div>
    </div>
  );
}
