import React, { useEffect, useState } from "react";
import InputEmoji from "react-input-emoji";

import send from "../../assets/icons/navigation-2.png";
import { useChats } from "../../contexts/ChatsContext";
import { useUI } from "../../contexts/UIContext";
import AttachButton from "../Buttons/AttachButton";

export default function MessageInput({ sendMessage }) {
  const { selectedChat } = useChats();
  const { messages } = useUI();
  const { message, editMessage } = messages;
  const [text, setText] = useState(message.text || "");
  const [file, setFile] = useState(null);

  const handleSend = () => {
    message.id ? editMessage(text) : sendMessage(text, file);
    setText("");
    setFile(null);
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
    setFile(null);

    // eslint-disable-next-line
  }, [selectedChat, message]);

  useEffect(() => {
    file && handleSend();

    // eslint-disable-next-line
  }, [file]);

  useEffect(() => {
    message.text && setText(message.text);
  }, [message]);

  return (
    <form className="message-form" onSubmit={handleSubmit}>
      <AttachButton setFile={(f) => setFile(f)} />
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
