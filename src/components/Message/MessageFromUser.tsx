import { FC } from "react";

import more from "../../assets/icons/more-horizontal.png";
import send from "../../assets/icons/checkmark.png";
import read from "../../assets/icons/all-done.png";
import MessageFile from "./MessageFile";
import MessageAction from "../MessageActions/MessageAction";
import { useUI } from "../../contexts/UIContext";
import { IMessage } from "../../types/chat.types";

const MessageFromUser: FC<{
  message: IMessage;
}> = ({ message }) => {
  const { messages } = useUI();
  const { showActionID, setShowActionID, cancelEdit } = messages;
  const isActionShowed = showActionID === message.id;

  const getMessageStatus = () => {
    enum statuses {
      READ = "read",
      SEND = "send",
    }

    switch (message.status) {
      case statuses.READ:
        return <img src={read} alt="read" />;
      case statuses.SEND:
        return <img src={send} alt="send" />;
      default:
        return <div>...</div>;
    }
  };

  const handleClick = () => {
    setShowActionID(!isActionShowed ? message.id : null);
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
        {message.file && <MessageFile file={message.file} />}
      </div>
      <div>{getMessageStatus()}</div>
    </div>
  );
};

export default MessageFromUser;
