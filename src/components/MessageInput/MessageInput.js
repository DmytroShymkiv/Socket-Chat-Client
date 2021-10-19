import React, { useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";

import plus from "../../assets/icons/plus.png";
import send from "../../assets/icons/navigation-2.png";
import { useChats } from "../../contexts/ChatsContext";

export default function MessageInput() {
  const { selectedChat } = useChats();
  const [text, setText] = useState("");

  function handleOnEnter(text) {
    console.log("enter", text);
  }

  useEffect(() => {
    //clear input
  }, [selectedChat]);

  return (
    <form className="message-form">
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
