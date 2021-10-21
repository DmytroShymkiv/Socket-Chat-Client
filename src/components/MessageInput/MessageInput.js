import React, { useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";

import plus from "../../assets/icons/plus.png";
import send from "../../assets/icons/navigation-2.png";
import { useChats } from "../../contexts/ChatsContext";

export default function MessageInput({sendMessage}) {
  const { selectedChat } = useChats();
  const [text, setText] = useState("");
  

  const handleSend = () => {    
    sendMessage(text);
    setText("");
  };

  function handleOnEnter() {
    handleSend();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSend();
  };

  useEffect(() => {
    setText("");
  }, [selectedChat]);

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <button className="message-form__button" type="button">
        <img src={plus} alt="plus" />
      </button>
      <InputEmoji
        className="message-form__input"
        placeholder="Type a message here"
        value={text}
        onChange={setText}
        cleanOnEnter
        onEnter={handleOnEnter}
      />
      <button className="message-form__button" type="submit">
        <img src={send} alt="send" />
      </button>
    </form>
  );
}
