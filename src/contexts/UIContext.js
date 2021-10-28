import React, { useContext, useState, useEffect } from "react";

import { useSocket } from "./SocketContext/SocketContext";

const UIContext = React.createContext();

export function useUI() {
  return useContext(UIContext);
}

export default function UIProvider({ children }) {
  const [message, setMessage] = useState({});
  const [showActionID, setShowActionID] = useState(null);

  const [isSomeHidden, setIsSomeHidden] = useState(false);
  const [currentHidden, setCurrentHidden] = useState("chat");

  const resize = () => {
    const WIDTH = 1020;
    if (window.innerWidth <= WIDTH) setIsSomeHidden(true);
    else setIsSomeHidden(false);
  };

  const hideChat = () => {
    setCurrentHidden("chat");
  };
  const hideList = () => {
    setCurrentHidden("list");
  };

  const isListHidden = isSomeHidden ? currentHidden === "list" : false;
  const isChatHidden = isSomeHidden ? currentHidden === "chat" : false;

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);

    // eslint-disable-next-line
  }, []);

  const { updateMessage } = useSocket();

  const startEdit = (id, text) => {
    setMessage({ id, text });
  };

  const cancelEdit = () => {
    setShowActionID(null);
    setMessage({});
  };

  const editMessage = (text) => {
    updateMessage(message.id, text);
    setMessage({});
    setShowActionID(null);
  };

  const value = {
    messages: {
      message,
      showActionID,
      setShowActionID,
      startEdit,
      cancelEdit,
      editMessage,
    },
    responsive: {
      isSomeHidden,
      isListHidden,
      isChatHidden,
      hideChat,
      hideList,
    },
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}
