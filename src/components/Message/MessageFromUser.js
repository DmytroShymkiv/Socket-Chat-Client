import React, { useState } from "react";

import more from "../../assets/icons/more-horizontal.png";
import send from "../../assets/icons/checkmark.png";
import read from "../../assets/icons/all-done.png";
import MessageFile from "./MessageFile";
import MessageAction from "../MessageActions/MessageAction";

export default function MessageFromUser({ message }) {
  const [showActions, setShowActions] = useState(false);
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

  return (
    <div className="message message-from">
      {showActions && <MessageAction id={message.id} text={message.text} />}
      <button onClick={() => setShowActions((prev) => !prev)}>
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
