import { FormEvent, useEffect, useRef, useState, FC } from "react";
import InputEmoji from "react-input-emoji";

import send from "../../assets/icons/navigation-2.png";
import { useChats } from "../../contexts/ChatsContext";
import { useUI } from "../../contexts/UIContext";
import { useSocket } from "../../contexts/SocketContext/SocketContext";
import AttachButton from "../Buttons/AttachButton";
import useOutsideClick from "../../hooks/useOutsideClick";
import { IFile } from "../../types/file.types";

const MessageInput: FC<{
  sendMessage: (message: string, file?: IFile) => void;
}> = ({ sendMessage }) => {
  const formRef = useRef(null);

  const { selectedChat } = useChats();
  const { messages } = useUI();
  const { startWriting, stopWriting } = useSocket();
  const { message, editMessage } = messages;
  const [text, setText] = useState<string>(message?.text || "");
  const [file, setFile] = useState<IFile | undefined>();

  const cancelWriting = () => {
    selectedChat && stopWriting(selectedChat.chat.id);
  };

  useOutsideClick(formRef, cancelWriting);

  const handleSend = () => {
    message ? editMessage(text) : sendMessage(text, file);
    setText("");
    setFile(undefined);
    cancelWriting();
  };

  function handleOnEnter() {
    handleSend();
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSend();
  };

  useEffect(() => {
    setText("");
    setFile(undefined);
    cancelWriting();

    // eslint-disable-next-line
  }, [selectedChat, message]);

  useEffect(() => {
    file && handleSend();

    // eslint-disable-next-line
  }, [file]);

  useEffect(() => {
    message?.text && setText(message.text);
  }, [message]);

  return (
    <>
      {selectedChat && (
        <form className="message-form" onSubmit={handleSubmit} ref={formRef}>
          <AttachButton setFile={(f: IFile) => setFile(f)} />
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
      )}
    </>
  );
};

export default MessageInput;
