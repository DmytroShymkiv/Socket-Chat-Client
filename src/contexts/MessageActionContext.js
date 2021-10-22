import React, { useContext, useState } from "react";

import useSocket from "../hooks/useSocket/useSocket";

const MessageActionsContext = React.createContext();

export function useMessageActions() {
  return useContext(MessageActionsContext);
}

export default function MessageActionsProvider({ children }) {
  const [editing, setEditing] = useState(false);
  const [message, setMessage] = useState({});

  const { updateMessage } = useSocket();

  const startEdit = (id, text) => {
    setEditing(true);
    setMessage({ id, text });
  };

  const editMessage = (text) => {    
    updateMessage(message.id, text);
  };

  const value = {
    editing,
    message,    
    startEdit,
    editMessage,
  };

  return (
    <MessageActionsContext.Provider value={value}>
      {children}
    </MessageActionsContext.Provider>
  );
}
