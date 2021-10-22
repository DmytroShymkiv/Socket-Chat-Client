import React, { useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";

import send from "../../assets/icons/navigation-2.png";
import { useChats } from "../../contexts/ChatsContext";
import { useMessageActions } from "../../contexts/MessageActionContext";
import AttachButton from "../Buttons/AttachButton";

export default function MessageInput({ sendMessage }) {
  const { selectedChat } = useChats();
  const { editing, message, editMessage } = useMessageActions();
  const [text, setText] = useState(message.text || "");

  const handleSend = () => {
    editing ? editMessage(text) : sendMessage(text);
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

  useEffect(() => {
    message.text && setText(message.text);
  }, [message]);

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <AttachButton />
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
