import React, { useContext, useState, useEffect, FC } from "react";

import { useSocket } from "./SocketContext/SocketContext";
import { currentHiddenType, hidden } from "../types/ui.types";

interface IContextValue {
  messages: IContextMessage;
  responsive: IContextResponsive;
}

interface IContextMessage {
  message: messageType;
  showActionID: string | null;
  setShowActionID: React.Dispatch<React.SetStateAction<string | null>>;
  startEdit: (id: string, text: string) => void;
  cancelEdit: () => void;
  editMessage: (text: string) => void;
}

interface IContextResponsive {
  isSomeHidden: boolean;
  isListHidden: boolean;
  isChatHidden: boolean;
  hideChat: () => void;
  hideList: () => void;
}

interface IMessage {
  id: string;
  text: string;
}

type messageType = IMessage | null;

const UIContext = React.createContext<IContextValue>({} as IContextValue);

export function useUI(): IContextValue {
  return useContext(UIContext);
}

const UIProvider: FC = ({ children }) => {
  const [message, setMessage] = useState<messageType>(null);
  const [showActionID, setShowActionID] = useState<string | null>(null);

  const [isSomeHidden, setIsSomeHidden] = useState<boolean>(false);
  const [currentHidden, setCurrentHidden] = useState<currentHiddenType>(
    hidden.CHAT
  );

  const resize = () => {
    const WIDTH = 1020;
    setIsSomeHidden(window.innerWidth <= WIDTH);
  };

  const hideChat = () => {
    setCurrentHidden(hidden.CHAT);
  };
  const hideList = () => {
    setCurrentHidden(hidden.LIST);
  };

  const isListHidden = isSomeHidden ? currentHidden === hidden.LIST : false;
  const isChatHidden = isSomeHidden ? currentHidden === hidden.CHAT : false;

  useEffect(() => {
    resize();
    window.addEventListener("resize", resize);

    return () => window.removeEventListener("resize", resize);

    // eslint-disable-next-line
  }, []);

  const { updateMessage } = useSocket();

  const startEdit = (id: string, text: string) => {
    setMessage({ id, text });
  };

  const cancelEdit = () => {
    setShowActionID(null);
    setMessage(null);
  };

  const editMessage = (text: string) => {
    if (!message) return;
    updateMessage(message.id, text);
    setMessage(null);
    setShowActionID(null);
  };

  const value: IContextValue = {
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
};

export default UIProvider;
