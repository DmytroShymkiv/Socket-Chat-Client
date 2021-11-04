import { FC } from "react";

import more from "../../assets/icons/more-horizontal.png";
import { IMessage } from "../../types/chat.types";
import MessageFile from "./MessageFile";

const MessageToUser: FC<{
  message: IMessage;
}> = ({ message }) => {
  return (
    <div className="message">
      <img className="message-to__sender" src={message.photo} alt="user" />
      <div className="message-to__content">
        {message.text}
        {message.file && <MessageFile file={message.file} />}
      </div>
      <button>
        <img src={more} alt="more" />
      </button>
    </div>
  );
};

export default MessageToUser;
