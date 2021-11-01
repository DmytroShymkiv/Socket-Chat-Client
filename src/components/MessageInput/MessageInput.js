import React, { useEffect, useRef, useState } from "react";
import InputEmoji from "react-input-emoji";

import send from "../../assets/icons/navigation-2.png";
import { useChats } from "../../contexts/ChatsContext";
import { useUI } from "../../contexts/UIContext";
import { useSocket } from "../../contexts/SocketContext/SocketContext";
import AttachButton from "../Buttons/AttachButton";
import useOutsideClick from "../../hooks/useOutsideClick";

export default function MessageInput({ sendMessage }) {
  const formRef = useRef();

  const { selectedChat } = useChats();
  const { messages } = useUI();
  const { startWriting, stopWriting } = useSocket();
  const { message, editMessage } = messages;
  const [text, setText] = useState(message.text || "");
  const [file, setFile] = useState(null);
  
  const cancelWriting = () => {
    stopWriting(selectedChat.chat.id);
  };

  useOutsideClick(formRef, cancelWriting);

  const handleSend = () => {
    message.id ? editMessage(text) : sendMessage(text, file);
    setText("");
    setFile(null);
    cancelWriting();
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
    cancelWriting();

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
    <form className="message-form" onSubmit={handleSubmit} ref={formRef}>
      <AttachButton setFile={(f) => setFile(f)} />
      <InputEmoji
        className="message-form__input"
        placeholder="Type a message here"
        value={text}
        onChange={setText}
        cleanOnEnter
        onEnter={handleOnEnter}
        onFocus={() => startWriting(selectedChat.chat.id)}
      />
      <button className="message-form__button" type="submit">
        <img src={send} alt="send" />
      </button>
    </form>
  );
}
