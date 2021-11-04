import { FC } from "react";

import { useSocket } from "../../contexts/SocketContext/SocketContext";
import { useUI } from "../../contexts/UIContext";

interface IMessageActionProps {
  id: string;
  text: string;
}

const MessageAction: FC<IMessageActionProps> = ({ id, text }) => {
  const { messages } = useUI();
  const { startEdit, cancelEdit } = messages;
  const { deleteMessageEmit } = useSocket();

  return (
    <div className="message-actions">
      <button onClick={() => startEdit(id, text)}>Edit</button>
      <button onClick={() => deleteMessageEmit(id)}>Delete</button>
      <button onClick={cancelEdit}>Cancel</button>
    </div>
  );
};

export default MessageAction;
