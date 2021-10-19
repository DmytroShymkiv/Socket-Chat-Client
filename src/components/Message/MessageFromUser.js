import React from "react";

import more from "../../assets/icons/more-horizontal.png";
import send from "../../assets/icons/checkmark.png";
import read from "../../assets/icons/all-done.png";

export default function MessageFromUser({ message }) {
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
      <button>
        <img src={more} alt="more" />
      </button>
      <div className="message-from__content">{message.text}</div>
      <div>{getMessageStatus()}</div>
    </div>
  );
}
