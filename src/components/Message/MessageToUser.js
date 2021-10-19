import React from "react";

import more from "../../assets/icons/more-horizontal.png";

export default function MessageToUser({ message }) {
  return (
    <div className="message">
      <img className="message-to__sender" src={message.photo} alt="user" />
      <div className="message-to__content">{message.text}</div>
      <button>
        <img src={more} alt="more"/>
      </button>
    </div>
  );
}
