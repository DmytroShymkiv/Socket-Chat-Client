import React from "react";

import useSocket from "../../hooks/useSocket/useSocket";
import { useMessageActions } from "../../contexts/MessageActionContext";

export default function MessageAction({ id, text }) {
  const { startEdit } = useMessageActions();
  const { deleteMessageEmit } = useSocket();

  return (
    <div className="message-actions">
      <button onClick={() => startEdit(id, text)}>Edit</button>
      <button onClick={() => deleteMessageEmit(id)}>Delete</button>
    </div>
  );
}
